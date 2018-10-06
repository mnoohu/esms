package org.iqra.esms.web.rest;

import org.iqra.esms.EsmsApp;

import org.iqra.esms.domain.PettyCash;
import org.iqra.esms.repository.PettyCashRepository;
import org.iqra.esms.service.PettyCashService;
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

/**
 * Test class for the PettyCashResource REST controller.
 *
 * @see PettyCashResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EsmsApp.class)
public class PettyCashResourceIntTest {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_CASH_IN = new BigDecimal(1);
    private static final BigDecimal UPDATED_CASH_IN = new BigDecimal(2);

    private static final BigDecimal DEFAULT_CASH_OUT = new BigDecimal(1);
    private static final BigDecimal UPDATED_CASH_OUT = new BigDecimal(2);

    @Autowired
    private PettyCashRepository pettyCashRepository;
    
    @Autowired
    private PettyCashService pettyCashService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPettyCashMockMvc;

    private PettyCash pettyCash;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PettyCashResource pettyCashResource = new PettyCashResource(pettyCashService);
        this.restPettyCashMockMvc = MockMvcBuilders.standaloneSetup(pettyCashResource)
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
    public static PettyCash createEntity(EntityManager em) {
        PettyCash pettyCash = new PettyCash()
            .date(DEFAULT_DATE)
            .details(DEFAULT_DETAILS)
            .cashIn(DEFAULT_CASH_IN)
            .cashOut(DEFAULT_CASH_OUT);
        return pettyCash;
    }

    @Before
    public void initTest() {
        pettyCash = createEntity(em);
    }

    @Test
    @Transactional
    public void createPettyCash() throws Exception {
        int databaseSizeBeforeCreate = pettyCashRepository.findAll().size();

        // Create the PettyCash
        restPettyCashMockMvc.perform(post("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCash)))
            .andExpect(status().isCreated());

        // Validate the PettyCash in the database
        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeCreate + 1);
        PettyCash testPettyCash = pettyCashList.get(pettyCashList.size() - 1);
        assertThat(testPettyCash.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testPettyCash.getDetails()).isEqualTo(DEFAULT_DETAILS);
        assertThat(testPettyCash.getCashIn()).isEqualTo(DEFAULT_CASH_IN);
        assertThat(testPettyCash.getCashOut()).isEqualTo(DEFAULT_CASH_OUT);
    }

    @Test
    @Transactional
    public void createPettyCashWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pettyCashRepository.findAll().size();

        // Create the PettyCash with an existing ID
        pettyCash.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPettyCashMockMvc.perform(post("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCash)))
            .andExpect(status().isBadRequest());

        // Validate the PettyCash in the database
        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = pettyCashRepository.findAll().size();
        // set the field null
        pettyCash.setDate(null);

        // Create the PettyCash, which fails.

        restPettyCashMockMvc.perform(post("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCash)))
            .andExpect(status().isBadRequest());

        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDetailsIsRequired() throws Exception {
        int databaseSizeBeforeTest = pettyCashRepository.findAll().size();
        // set the field null
        pettyCash.setDetails(null);

        // Create the PettyCash, which fails.

        restPettyCashMockMvc.perform(post("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCash)))
            .andExpect(status().isBadRequest());

        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPettyCashes() throws Exception {
        // Initialize the database
        pettyCashRepository.saveAndFlush(pettyCash);

        // Get all the pettyCashList
        restPettyCashMockMvc.perform(get("/api/petty-cashes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pettyCash.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS.toString())))
            .andExpect(jsonPath("$.[*].cashIn").value(hasItem(DEFAULT_CASH_IN.intValue())))
            .andExpect(jsonPath("$.[*].cashOut").value(hasItem(DEFAULT_CASH_OUT.intValue())));
    }
    
    @Test
    @Transactional
    public void getPettyCash() throws Exception {
        // Initialize the database
        pettyCashRepository.saveAndFlush(pettyCash);

        // Get the pettyCash
        restPettyCashMockMvc.perform(get("/api/petty-cashes/{id}", pettyCash.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pettyCash.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS.toString()))
            .andExpect(jsonPath("$.cashIn").value(DEFAULT_CASH_IN.intValue()))
            .andExpect(jsonPath("$.cashOut").value(DEFAULT_CASH_OUT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPettyCash() throws Exception {
        // Get the pettyCash
        restPettyCashMockMvc.perform(get("/api/petty-cashes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePettyCash() throws Exception {
        // Initialize the database
        pettyCashService.save(pettyCash);

        int databaseSizeBeforeUpdate = pettyCashRepository.findAll().size();

        // Update the pettyCash
        PettyCash updatedPettyCash = pettyCashRepository.findById(pettyCash.getId()).get();
        // Disconnect from session so that the updates on updatedPettyCash are not directly saved in db
        em.detach(updatedPettyCash);
        updatedPettyCash
            .date(UPDATED_DATE)
            .details(UPDATED_DETAILS)
            .cashIn(UPDATED_CASH_IN)
            .cashOut(UPDATED_CASH_OUT);

        restPettyCashMockMvc.perform(put("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPettyCash)))
            .andExpect(status().isOk());

        // Validate the PettyCash in the database
        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeUpdate);
        PettyCash testPettyCash = pettyCashList.get(pettyCashList.size() - 1);
        assertThat(testPettyCash.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testPettyCash.getDetails()).isEqualTo(UPDATED_DETAILS);
        assertThat(testPettyCash.getCashIn()).isEqualTo(UPDATED_CASH_IN);
        assertThat(testPettyCash.getCashOut()).isEqualTo(UPDATED_CASH_OUT);
    }

    @Test
    @Transactional
    public void updateNonExistingPettyCash() throws Exception {
        int databaseSizeBeforeUpdate = pettyCashRepository.findAll().size();

        // Create the PettyCash

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPettyCashMockMvc.perform(put("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCash)))
            .andExpect(status().isBadRequest());

        // Validate the PettyCash in the database
        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePettyCash() throws Exception {
        // Initialize the database
        pettyCashService.save(pettyCash);

        int databaseSizeBeforeDelete = pettyCashRepository.findAll().size();

        // Get the pettyCash
        restPettyCashMockMvc.perform(delete("/api/petty-cashes/{id}", pettyCash.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PettyCash.class);
        PettyCash pettyCash1 = new PettyCash();
        pettyCash1.setId(1L);
        PettyCash pettyCash2 = new PettyCash();
        pettyCash2.setId(pettyCash1.getId());
        assertThat(pettyCash1).isEqualTo(pettyCash2);
        pettyCash2.setId(2L);
        assertThat(pettyCash1).isNotEqualTo(pettyCash2);
        pettyCash1.setId(null);
        assertThat(pettyCash1).isNotEqualTo(pettyCash2);
    }
}
