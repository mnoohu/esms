package org.iqra.esms.web.rest;

import org.iqra.esms.EsmsApp;

import org.iqra.esms.domain.SponsorCommitments;
import org.iqra.esms.repository.SponsorCommitmentsRepository;
import org.iqra.esms.service.SponsorCommitmentsService;
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
 * Test class for the SponsorCommitmentsResource REST controller.
 *
 * @see SponsorCommitmentsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EsmsApp.class)
public class SponsorCommitmentsResourceIntTest {

    private static final Instant DEFAULT_FOR_YEAR = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FOR_YEAR = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final String DEFAULT_PAID = "AAAAAAAAAA";
    private static final String UPDATED_PAID = "BBBBBBBBBB";

    private static final Integer DEFAULT_RECIPT_NO = 1;
    private static final Integer UPDATED_RECIPT_NO = 2;

    @Autowired
    private SponsorCommitmentsRepository sponsorCommitmentsRepository;
    
    @Autowired
    private SponsorCommitmentsService sponsorCommitmentsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSponsorCommitmentsMockMvc;

    private SponsorCommitments sponsorCommitments;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SponsorCommitmentsResource sponsorCommitmentsResource = new SponsorCommitmentsResource(sponsorCommitmentsService);
        this.restSponsorCommitmentsMockMvc = MockMvcBuilders.standaloneSetup(sponsorCommitmentsResource)
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
    public static SponsorCommitments createEntity(EntityManager em) {
        SponsorCommitments sponsorCommitments = new SponsorCommitments()
            .forYear(DEFAULT_FOR_YEAR)
            .amount(DEFAULT_AMOUNT)
            .paid(DEFAULT_PAID)
            .reciptNo(DEFAULT_RECIPT_NO);
        return sponsorCommitments;
    }

    @Before
    public void initTest() {
        sponsorCommitments = createEntity(em);
    }

    @Test
    @Transactional
    public void createSponsorCommitments() throws Exception {
        int databaseSizeBeforeCreate = sponsorCommitmentsRepository.findAll().size();

        // Create the SponsorCommitments
        restSponsorCommitmentsMockMvc.perform(post("/api/sponsor-commitments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorCommitments)))
            .andExpect(status().isCreated());

        // Validate the SponsorCommitments in the database
        List<SponsorCommitments> sponsorCommitmentsList = sponsorCommitmentsRepository.findAll();
        assertThat(sponsorCommitmentsList).hasSize(databaseSizeBeforeCreate + 1);
        SponsorCommitments testSponsorCommitments = sponsorCommitmentsList.get(sponsorCommitmentsList.size() - 1);
        assertThat(testSponsorCommitments.getForYear()).isEqualTo(DEFAULT_FOR_YEAR);
        assertThat(testSponsorCommitments.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testSponsorCommitments.getPaid()).isEqualTo(DEFAULT_PAID);
        assertThat(testSponsorCommitments.getReciptNo()).isEqualTo(DEFAULT_RECIPT_NO);
    }

    @Test
    @Transactional
    public void createSponsorCommitmentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sponsorCommitmentsRepository.findAll().size();

        // Create the SponsorCommitments with an existing ID
        sponsorCommitments.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSponsorCommitmentsMockMvc.perform(post("/api/sponsor-commitments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorCommitments)))
            .andExpect(status().isBadRequest());

        // Validate the SponsorCommitments in the database
        List<SponsorCommitments> sponsorCommitmentsList = sponsorCommitmentsRepository.findAll();
        assertThat(sponsorCommitmentsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkForYearIsRequired() throws Exception {
        int databaseSizeBeforeTest = sponsorCommitmentsRepository.findAll().size();
        // set the field null
        sponsorCommitments.setForYear(null);

        // Create the SponsorCommitments, which fails.

        restSponsorCommitmentsMockMvc.perform(post("/api/sponsor-commitments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorCommitments)))
            .andExpect(status().isBadRequest());

        List<SponsorCommitments> sponsorCommitmentsList = sponsorCommitmentsRepository.findAll();
        assertThat(sponsorCommitmentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = sponsorCommitmentsRepository.findAll().size();
        // set the field null
        sponsorCommitments.setAmount(null);

        // Create the SponsorCommitments, which fails.

        restSponsorCommitmentsMockMvc.perform(post("/api/sponsor-commitments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorCommitments)))
            .andExpect(status().isBadRequest());

        List<SponsorCommitments> sponsorCommitmentsList = sponsorCommitmentsRepository.findAll();
        assertThat(sponsorCommitmentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPaidIsRequired() throws Exception {
        int databaseSizeBeforeTest = sponsorCommitmentsRepository.findAll().size();
        // set the field null
        sponsorCommitments.setPaid(null);

        // Create the SponsorCommitments, which fails.

        restSponsorCommitmentsMockMvc.perform(post("/api/sponsor-commitments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorCommitments)))
            .andExpect(status().isBadRequest());

        List<SponsorCommitments> sponsorCommitmentsList = sponsorCommitmentsRepository.findAll();
        assertThat(sponsorCommitmentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSponsorCommitments() throws Exception {
        // Initialize the database
        sponsorCommitmentsRepository.saveAndFlush(sponsorCommitments);

        // Get all the sponsorCommitmentsList
        restSponsorCommitmentsMockMvc.perform(get("/api/sponsor-commitments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sponsorCommitments.getId().intValue())))
            .andExpect(jsonPath("$.[*].forYear").value(hasItem(DEFAULT_FOR_YEAR.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].paid").value(hasItem(DEFAULT_PAID.toString())))
            .andExpect(jsonPath("$.[*].reciptNo").value(hasItem(DEFAULT_RECIPT_NO)));
    }
    
    @Test
    @Transactional
    public void getSponsorCommitments() throws Exception {
        // Initialize the database
        sponsorCommitmentsRepository.saveAndFlush(sponsorCommitments);

        // Get the sponsorCommitments
        restSponsorCommitmentsMockMvc.perform(get("/api/sponsor-commitments/{id}", sponsorCommitments.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sponsorCommitments.getId().intValue()))
            .andExpect(jsonPath("$.forYear").value(DEFAULT_FOR_YEAR.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.paid").value(DEFAULT_PAID.toString()))
            .andExpect(jsonPath("$.reciptNo").value(DEFAULT_RECIPT_NO));
    }

    @Test
    @Transactional
    public void getNonExistingSponsorCommitments() throws Exception {
        // Get the sponsorCommitments
        restSponsorCommitmentsMockMvc.perform(get("/api/sponsor-commitments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSponsorCommitments() throws Exception {
        // Initialize the database
        sponsorCommitmentsService.save(sponsorCommitments);

        int databaseSizeBeforeUpdate = sponsorCommitmentsRepository.findAll().size();

        // Update the sponsorCommitments
        SponsorCommitments updatedSponsorCommitments = sponsorCommitmentsRepository.findById(sponsorCommitments.getId()).get();
        // Disconnect from session so that the updates on updatedSponsorCommitments are not directly saved in db
        em.detach(updatedSponsorCommitments);
        updatedSponsorCommitments
            .forYear(UPDATED_FOR_YEAR)
            .amount(UPDATED_AMOUNT)
            .paid(UPDATED_PAID)
            .reciptNo(UPDATED_RECIPT_NO);

        restSponsorCommitmentsMockMvc.perform(put("/api/sponsor-commitments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSponsorCommitments)))
            .andExpect(status().isOk());

        // Validate the SponsorCommitments in the database
        List<SponsorCommitments> sponsorCommitmentsList = sponsorCommitmentsRepository.findAll();
        assertThat(sponsorCommitmentsList).hasSize(databaseSizeBeforeUpdate);
        SponsorCommitments testSponsorCommitments = sponsorCommitmentsList.get(sponsorCommitmentsList.size() - 1);
        assertThat(testSponsorCommitments.getForYear()).isEqualTo(UPDATED_FOR_YEAR);
        assertThat(testSponsorCommitments.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testSponsorCommitments.getPaid()).isEqualTo(UPDATED_PAID);
        assertThat(testSponsorCommitments.getReciptNo()).isEqualTo(UPDATED_RECIPT_NO);
    }

    @Test
    @Transactional
    public void updateNonExistingSponsorCommitments() throws Exception {
        int databaseSizeBeforeUpdate = sponsorCommitmentsRepository.findAll().size();

        // Create the SponsorCommitments

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSponsorCommitmentsMockMvc.perform(put("/api/sponsor-commitments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorCommitments)))
            .andExpect(status().isBadRequest());

        // Validate the SponsorCommitments in the database
        List<SponsorCommitments> sponsorCommitmentsList = sponsorCommitmentsRepository.findAll();
        assertThat(sponsorCommitmentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSponsorCommitments() throws Exception {
        // Initialize the database
        sponsorCommitmentsService.save(sponsorCommitments);

        int databaseSizeBeforeDelete = sponsorCommitmentsRepository.findAll().size();

        // Get the sponsorCommitments
        restSponsorCommitmentsMockMvc.perform(delete("/api/sponsor-commitments/{id}", sponsorCommitments.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SponsorCommitments> sponsorCommitmentsList = sponsorCommitmentsRepository.findAll();
        assertThat(sponsorCommitmentsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SponsorCommitments.class);
        SponsorCommitments sponsorCommitments1 = new SponsorCommitments();
        sponsorCommitments1.setId(1L);
        SponsorCommitments sponsorCommitments2 = new SponsorCommitments();
        sponsorCommitments2.setId(sponsorCommitments1.getId());
        assertThat(sponsorCommitments1).isEqualTo(sponsorCommitments2);
        sponsorCommitments2.setId(2L);
        assertThat(sponsorCommitments1).isNotEqualTo(sponsorCommitments2);
        sponsorCommitments1.setId(null);
        assertThat(sponsorCommitments1).isNotEqualTo(sponsorCommitments2);
    }
}
