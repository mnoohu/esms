package org.iqra.esms.web.rest;

import org.iqra.esms.EsmsApp;

import org.iqra.esms.domain.Receipts;
import org.iqra.esms.repository.ReceiptsRepository;
import org.iqra.esms.service.ReceiptsService;
import org.iqra.esms.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static org.iqra.esms.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.iqra.esms.domain.enumeration.ReceiptType;
/**
 * Test class for the ReceiptsResource REST controller.
 *
 * @see ReceiptsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EsmsApp.class)
public class ReceiptsResourceIntTest {

    private static final Instant DEFAULT_RECEIPT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RECEIPT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final ReceiptType DEFAULT_RECEIPT_TYPE = ReceiptType.DONATION;
    private static final ReceiptType UPDATED_RECEIPT_TYPE = ReceiptType.SUBSCRIPTION;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final Instant DEFAULT_FOR_YEAR = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FOR_YEAR = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private ReceiptsRepository receiptsRepository;
    
    @Autowired
    private ReceiptsService receiptsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReceiptsMockMvc;

    private Receipts receipts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReceiptsResource receiptsResource = new ReceiptsResource(receiptsService);
        this.restReceiptsMockMvc = MockMvcBuilders.standaloneSetup(receiptsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Receipts createEntity(EntityManager em) {
        Receipts receipts = new Receipts()
            .receiptDate(DEFAULT_RECEIPT_DATE)
            .receiptType(DEFAULT_RECEIPT_TYPE)
            .name(DEFAULT_NAME)
            .amount(DEFAULT_AMOUNT)
            .forYear(DEFAULT_FOR_YEAR)
            .remarks(DEFAULT_REMARKS);
        return receipts;
    }

    @Before
    public void initTest() {
        receipts = createEntity(em);
    }

    @Test
    @Transactional
    public void createReceipts() throws Exception {
        int databaseSizeBeforeCreate = receiptsRepository.findAll().size();

        // Create the Receipts
        restReceiptsMockMvc.perform(post("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receipts)))
            .andExpect(status().isCreated());

        // Validate the Receipts in the database
        List<Receipts> receiptsList = receiptsRepository.findAll();
        assertThat(receiptsList).hasSize(databaseSizeBeforeCreate + 1);
        Receipts testReceipts = receiptsList.get(receiptsList.size() - 1);
        assertThat(testReceipts.getReceiptDate()).isEqualTo(DEFAULT_RECEIPT_DATE);
        assertThat(testReceipts.getReceiptType()).isEqualTo(DEFAULT_RECEIPT_TYPE);
        assertThat(testReceipts.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testReceipts.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testReceipts.getForYear()).isEqualTo(DEFAULT_FOR_YEAR);
        assertThat(testReceipts.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    @Transactional
    public void createReceiptsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = receiptsRepository.findAll().size();

        // Create the Receipts with an existing ID
        receipts.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceiptsMockMvc.perform(post("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receipts)))
            .andExpect(status().isBadRequest());

        // Validate the Receipts in the database
        List<Receipts> receiptsList = receiptsRepository.findAll();
        assertThat(receiptsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkReceiptDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiptsRepository.findAll().size();
        // set the field null
        receipts.setReceiptDate(null);

        // Create the Receipts, which fails.

        restReceiptsMockMvc.perform(post("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receipts)))
            .andExpect(status().isBadRequest());

        List<Receipts> receiptsList = receiptsRepository.findAll();
        assertThat(receiptsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReceiptTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiptsRepository.findAll().size();
        // set the field null
        receipts.setReceiptType(null);

        // Create the Receipts, which fails.

        restReceiptsMockMvc.perform(post("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receipts)))
            .andExpect(status().isBadRequest());

        List<Receipts> receiptsList = receiptsRepository.findAll();
        assertThat(receiptsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiptsRepository.findAll().size();
        // set the field null
        receipts.setName(null);

        // Create the Receipts, which fails.

        restReceiptsMockMvc.perform(post("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receipts)))
            .andExpect(status().isBadRequest());

        List<Receipts> receiptsList = receiptsRepository.findAll();
        assertThat(receiptsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiptsRepository.findAll().size();
        // set the field null
        receipts.setAmount(null);

        // Create the Receipts, which fails.

        restReceiptsMockMvc.perform(post("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receipts)))
            .andExpect(status().isBadRequest());

        List<Receipts> receiptsList = receiptsRepository.findAll();
        assertThat(receiptsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReceipts() throws Exception {
        // Initialize the database
        receiptsRepository.saveAndFlush(receipts);

        // Get all the receiptsList
        restReceiptsMockMvc.perform(get("/api/receipts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(receipts.getId().intValue())))
            .andExpect(jsonPath("$.[*].receiptDate").value(hasItem(DEFAULT_RECEIPT_DATE.toString())))
            .andExpect(jsonPath("$.[*].receiptType").value(hasItem(DEFAULT_RECEIPT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].forYear").value(hasItem(DEFAULT_FOR_YEAR.toString())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())));
    }
    
    @Test
    @Transactional
    public void getReceipts() throws Exception {
        // Initialize the database
        receiptsRepository.saveAndFlush(receipts);

        // Get the receipts
        restReceiptsMockMvc.perform(get("/api/receipts/{id}", receipts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(receipts.getId().intValue()))
            .andExpect(jsonPath("$.receiptDate").value(DEFAULT_RECEIPT_DATE.toString()))
            .andExpect(jsonPath("$.receiptType").value(DEFAULT_RECEIPT_TYPE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.forYear").value(DEFAULT_FOR_YEAR.toString()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReceipts() throws Exception {
        // Get the receipts
        restReceiptsMockMvc.perform(get("/api/receipts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReceipts() throws Exception {
        // Initialize the database
        receiptsService.save(receipts);

        int databaseSizeBeforeUpdate = receiptsRepository.findAll().size();

        // Update the receipts
        Receipts updatedReceipts = receiptsRepository.findById(receipts.getId()).get();
        // Disconnect from session so that the updates on updatedReceipts are not directly saved in db
        em.detach(updatedReceipts);
        updatedReceipts
            .receiptDate(UPDATED_RECEIPT_DATE)
            .receiptType(UPDATED_RECEIPT_TYPE)
            .name(UPDATED_NAME)
            .amount(UPDATED_AMOUNT)
            .forYear(UPDATED_FOR_YEAR)
            .remarks(UPDATED_REMARKS);

        restReceiptsMockMvc.perform(put("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReceipts)))
            .andExpect(status().isOk());

        // Validate the Receipts in the database
        List<Receipts> receiptsList = receiptsRepository.findAll();
        assertThat(receiptsList).hasSize(databaseSizeBeforeUpdate);
        Receipts testReceipts = receiptsList.get(receiptsList.size() - 1);
        assertThat(testReceipts.getReceiptDate()).isEqualTo(UPDATED_RECEIPT_DATE);
        assertThat(testReceipts.getReceiptType()).isEqualTo(UPDATED_RECEIPT_TYPE);
        assertThat(testReceipts.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testReceipts.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testReceipts.getForYear()).isEqualTo(UPDATED_FOR_YEAR);
        assertThat(testReceipts.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    @Transactional
    public void updateNonExistingReceipts() throws Exception {
        int databaseSizeBeforeUpdate = receiptsRepository.findAll().size();

        // Create the Receipts

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceiptsMockMvc.perform(put("/api/receipts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receipts)))
            .andExpect(status().isBadRequest());

        // Validate the Receipts in the database
        List<Receipts> receiptsList = receiptsRepository.findAll();
        assertThat(receiptsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReceipts() throws Exception {
        // Initialize the database
        receiptsService.save(receipts);

        int databaseSizeBeforeDelete = receiptsRepository.findAll().size();

        // Get the receipts
        restReceiptsMockMvc.perform(delete("/api/receipts/{id}", receipts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Receipts> receiptsList = receiptsRepository.findAll();
        assertThat(receiptsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Receipts.class);
        Receipts receipts1 = new Receipts();
        receipts1.setId(1L);
        Receipts receipts2 = new Receipts();
        receipts2.setId(receipts1.getId());
        assertThat(receipts1).isEqualTo(receipts2);
        receipts2.setId(2L);
        assertThat(receipts1).isNotEqualTo(receipts2);
        receipts1.setId(null);
        assertThat(receipts1).isNotEqualTo(receipts2);
    }
}
