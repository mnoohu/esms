package org.iqra.esms.web.rest;

import org.iqra.esms.EsmsApp;

import org.iqra.esms.domain.ZakaathAmount;
import org.iqra.esms.repository.ZakaathAmountRepository;
import org.iqra.esms.service.ZakaathAmountService;
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
import java.util.List;


import static org.iqra.esms.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ZakaathAmountResource REST controller.
 *
 * @see ZakaathAmountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EsmsApp.class)
public class ZakaathAmountResourceIntTest {

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(0);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(1);

    @Autowired
    private ZakaathAmountRepository zakaathAmountRepository;
    
    @Autowired
    private ZakaathAmountService zakaathAmountService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restZakaathAmountMockMvc;

    private ZakaathAmount zakaathAmount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ZakaathAmountResource zakaathAmountResource = new ZakaathAmountResource(zakaathAmountService);
        this.restZakaathAmountMockMvc = MockMvcBuilders.standaloneSetup(zakaathAmountResource)
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
    public static ZakaathAmount createEntity(EntityManager em) {
        ZakaathAmount zakaathAmount = new ZakaathAmount()
            .amount(DEFAULT_AMOUNT);
        return zakaathAmount;
    }

    @Before
    public void initTest() {
        zakaathAmount = createEntity(em);
    }

    @Test
    @Transactional
    public void createZakaathAmount() throws Exception {
        int databaseSizeBeforeCreate = zakaathAmountRepository.findAll().size();

        // Create the ZakaathAmount
        restZakaathAmountMockMvc.perform(post("/api/zakaath-amounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zakaathAmount)))
            .andExpect(status().isCreated());

        // Validate the ZakaathAmount in the database
        List<ZakaathAmount> zakaathAmountList = zakaathAmountRepository.findAll();
        assertThat(zakaathAmountList).hasSize(databaseSizeBeforeCreate + 1);
        ZakaathAmount testZakaathAmount = zakaathAmountList.get(zakaathAmountList.size() - 1);
        assertThat(testZakaathAmount.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createZakaathAmountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = zakaathAmountRepository.findAll().size();

        // Create the ZakaathAmount with an existing ID
        zakaathAmount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restZakaathAmountMockMvc.perform(post("/api/zakaath-amounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zakaathAmount)))
            .andExpect(status().isBadRequest());

        // Validate the ZakaathAmount in the database
        List<ZakaathAmount> zakaathAmountList = zakaathAmountRepository.findAll();
        assertThat(zakaathAmountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = zakaathAmountRepository.findAll().size();
        // set the field null
        zakaathAmount.setAmount(null);

        // Create the ZakaathAmount, which fails.

        restZakaathAmountMockMvc.perform(post("/api/zakaath-amounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zakaathAmount)))
            .andExpect(status().isBadRequest());

        List<ZakaathAmount> zakaathAmountList = zakaathAmountRepository.findAll();
        assertThat(zakaathAmountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllZakaathAmounts() throws Exception {
        // Initialize the database
        zakaathAmountRepository.saveAndFlush(zakaathAmount);

        // Get all the zakaathAmountList
        restZakaathAmountMockMvc.perform(get("/api/zakaath-amounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zakaathAmount.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())));
    }
    
    @Test
    @Transactional
    public void getZakaathAmount() throws Exception {
        // Initialize the database
        zakaathAmountRepository.saveAndFlush(zakaathAmount);

        // Get the zakaathAmount
        restZakaathAmountMockMvc.perform(get("/api/zakaath-amounts/{id}", zakaathAmount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(zakaathAmount.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingZakaathAmount() throws Exception {
        // Get the zakaathAmount
        restZakaathAmountMockMvc.perform(get("/api/zakaath-amounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateZakaathAmount() throws Exception {
        // Initialize the database
        zakaathAmountService.save(zakaathAmount);

        int databaseSizeBeforeUpdate = zakaathAmountRepository.findAll().size();

        // Update the zakaathAmount
        ZakaathAmount updatedZakaathAmount = zakaathAmountRepository.findById(zakaathAmount.getId()).get();
        // Disconnect from session so that the updates on updatedZakaathAmount are not directly saved in db
        em.detach(updatedZakaathAmount);
        updatedZakaathAmount
            .amount(UPDATED_AMOUNT);

        restZakaathAmountMockMvc.perform(put("/api/zakaath-amounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedZakaathAmount)))
            .andExpect(status().isOk());

        // Validate the ZakaathAmount in the database
        List<ZakaathAmount> zakaathAmountList = zakaathAmountRepository.findAll();
        assertThat(zakaathAmountList).hasSize(databaseSizeBeforeUpdate);
        ZakaathAmount testZakaathAmount = zakaathAmountList.get(zakaathAmountList.size() - 1);
        assertThat(testZakaathAmount.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingZakaathAmount() throws Exception {
        int databaseSizeBeforeUpdate = zakaathAmountRepository.findAll().size();

        // Create the ZakaathAmount

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZakaathAmountMockMvc.perform(put("/api/zakaath-amounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zakaathAmount)))
            .andExpect(status().isBadRequest());

        // Validate the ZakaathAmount in the database
        List<ZakaathAmount> zakaathAmountList = zakaathAmountRepository.findAll();
        assertThat(zakaathAmountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteZakaathAmount() throws Exception {
        // Initialize the database
        zakaathAmountService.save(zakaathAmount);

        int databaseSizeBeforeDelete = zakaathAmountRepository.findAll().size();

        // Get the zakaathAmount
        restZakaathAmountMockMvc.perform(delete("/api/zakaath-amounts/{id}", zakaathAmount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ZakaathAmount> zakaathAmountList = zakaathAmountRepository.findAll();
        assertThat(zakaathAmountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ZakaathAmount.class);
        ZakaathAmount zakaathAmount1 = new ZakaathAmount();
        zakaathAmount1.setId(1L);
        ZakaathAmount zakaathAmount2 = new ZakaathAmount();
        zakaathAmount2.setId(zakaathAmount1.getId());
        assertThat(zakaathAmount1).isEqualTo(zakaathAmount2);
        zakaathAmount2.setId(2L);
        assertThat(zakaathAmount1).isNotEqualTo(zakaathAmount2);
        zakaathAmount1.setId(null);
        assertThat(zakaathAmount1).isNotEqualTo(zakaathAmount2);
    }
}
