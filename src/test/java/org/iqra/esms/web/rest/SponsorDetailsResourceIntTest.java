package org.iqra.esms.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.iqra.esms.web.rest.TestUtil.createFormattingConversionService;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import javax.persistence.EntityManager;

import org.iqra.esms.EsmsApp;
import org.iqra.esms.domain.SponsorDetails;
import org.iqra.esms.domain.enumeration.Gender;
import org.iqra.esms.repository.SponsorDetailsRepository;
import org.iqra.esms.service.SponsorDetailsService;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
/**
 * Test class for the SponsorDetailsResource REST controller.
 *
 * @see SponsorDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EsmsApp.class)
@WithMockUser(username="admin", authorities={"ROLE_ADMIN"},
password = "admin")
public class SponsorDetailsResourceIntTest {

    private static final String DEFAULT_SPONSOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SPONSOR_NAME = "BBBBBBBBBB";

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final byte[] DEFAULT_PROFILE_PICTURE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PROFILE_PICTURE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PROFILE_PICTURE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PROFILE_PICTURE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_DOORNO = "AAAAAAAAAA";
    private static final String UPDATED_DOORNO = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE_NO = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_NO = "BBBBBBBBBB";

    private static final String DEFAULT_LANDLINE_NO = "AAAAAAAAAA";
    private static final String UPDATED_LANDLINE_NO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private SponsorDetailsRepository sponsorDetailsRepository;
    
    @Autowired
    private SponsorDetailsService sponsorDetailsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSponsorDetailsMockMvc;

    private SponsorDetails sponsorDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SponsorDetailsResource sponsorDetailsResource = new SponsorDetailsResource(sponsorDetailsService);
        this.restSponsorDetailsMockMvc = MockMvcBuilders.standaloneSetup(sponsorDetailsResource)
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
    public static SponsorDetails createEntity(EntityManager em) {
        SponsorDetails sponsorDetails = new SponsorDetails()
            .sponsorName(DEFAULT_SPONSOR_NAME)
            .gender(DEFAULT_GENDER)
            .profilePicture(DEFAULT_PROFILE_PICTURE)
            .profilePictureContentType(DEFAULT_PROFILE_PICTURE_CONTENT_TYPE)
            .doorno(DEFAULT_DOORNO)
            .mobileNo(DEFAULT_MOBILE_NO)
            .landlineNo(DEFAULT_LANDLINE_NO)
            .email(DEFAULT_EMAIL);
        return sponsorDetails;
    }

    @Before
    public void initTest() {
        sponsorDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createSponsorDetails() throws Exception {
        int databaseSizeBeforeCreate = sponsorDetailsRepository.findAll().size();

        // Create the SponsorDetails
        restSponsorDetailsMockMvc.perform(post("/api/sponsor-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorDetails)))
            .andExpect(status().isCreated());

        // Validate the SponsorDetails in the database
        List<SponsorDetails> sponsorDetailsList = sponsorDetailsRepository.findAll();
        assertThat(sponsorDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        SponsorDetails testSponsorDetails = sponsorDetailsList.get(sponsorDetailsList.size() - 1);
        assertThat(testSponsorDetails.getSponsorName()).isEqualTo(DEFAULT_SPONSOR_NAME);
        assertThat(testSponsorDetails.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testSponsorDetails.getProfilePicture()).isEqualTo(DEFAULT_PROFILE_PICTURE);
        assertThat(testSponsorDetails.getProfilePictureContentType()).isEqualTo(DEFAULT_PROFILE_PICTURE_CONTENT_TYPE);
        assertThat(testSponsorDetails.getDoorno()).isEqualTo(DEFAULT_DOORNO);
        assertThat(testSponsorDetails.getMobileNo()).isEqualTo(DEFAULT_MOBILE_NO);
        assertThat(testSponsorDetails.getLandlineNo()).isEqualTo(DEFAULT_LANDLINE_NO);
        assertThat(testSponsorDetails.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createSponsorDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sponsorDetailsRepository.findAll().size();

        // Create the SponsorDetails with an existing ID
        sponsorDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSponsorDetailsMockMvc.perform(post("/api/sponsor-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorDetails)))
            .andExpect(status().isBadRequest());

        // Validate the SponsorDetails in the database
        List<SponsorDetails> sponsorDetailsList = sponsorDetailsRepository.findAll();
        assertThat(sponsorDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSponsorNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = sponsorDetailsRepository.findAll().size();
        // set the field null
        sponsorDetails.setSponsorName(null);

        // Create the SponsorDetails, which fails.

        restSponsorDetailsMockMvc.perform(post("/api/sponsor-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorDetails)))
            .andExpect(status().isBadRequest());

        List<SponsorDetails> sponsorDetailsList = sponsorDetailsRepository.findAll();
        assertThat(sponsorDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGenderIsRequired() throws Exception {
        int databaseSizeBeforeTest = sponsorDetailsRepository.findAll().size();
        // set the field null
        sponsorDetails.setGender(null);

        // Create the SponsorDetails, which fails.

        restSponsorDetailsMockMvc.perform(post("/api/sponsor-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorDetails)))
            .andExpect(status().isBadRequest());

        List<SponsorDetails> sponsorDetailsList = sponsorDetailsRepository.findAll();
        assertThat(sponsorDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDoornoIsRequired() throws Exception {
        int databaseSizeBeforeTest = sponsorDetailsRepository.findAll().size();
        // set the field null
        sponsorDetails.setDoorno(null);

        // Create the SponsorDetails, which fails.

        restSponsorDetailsMockMvc.perform(post("/api/sponsor-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorDetails)))
            .andExpect(status().isBadRequest());

        List<SponsorDetails> sponsorDetailsList = sponsorDetailsRepository.findAll();
        assertThat(sponsorDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMobileNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = sponsorDetailsRepository.findAll().size();
        // set the field null
        sponsorDetails.setMobileNo(null);

        // Create the SponsorDetails, which fails.

        restSponsorDetailsMockMvc.perform(post("/api/sponsor-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorDetails)))
            .andExpect(status().isBadRequest());

        List<SponsorDetails> sponsorDetailsList = sponsorDetailsRepository.findAll();
        assertThat(sponsorDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSponsorDetails() throws Exception {
        // Initialize the database
        sponsorDetailsRepository.saveAndFlush(sponsorDetails);

        // Get all the sponsorDetailsList
        restSponsorDetailsMockMvc.perform(get("/api/sponsor-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sponsorDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].sponsorName").value(hasItem(DEFAULT_SPONSOR_NAME.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].profilePictureContentType").value(hasItem(DEFAULT_PROFILE_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].profilePicture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PROFILE_PICTURE))))
            .andExpect(jsonPath("$.[*].doorno").value(hasItem(DEFAULT_DOORNO.toString())))
            .andExpect(jsonPath("$.[*].mobileNo").value(hasItem(DEFAULT_MOBILE_NO.toString())))
            .andExpect(jsonPath("$.[*].landlineNo").value(hasItem(DEFAULT_LANDLINE_NO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    
    @Test
    @Transactional
    public void getSponsorDetails() throws Exception {
        // Initialize the database
        sponsorDetailsRepository.saveAndFlush(sponsorDetails);

        // Get the sponsorDetails
        restSponsorDetailsMockMvc.perform(get("/api/sponsor-details/{id}", sponsorDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sponsorDetails.getId().intValue()))
            .andExpect(jsonPath("$.sponsorName").value(DEFAULT_SPONSOR_NAME.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.profilePictureContentType").value(DEFAULT_PROFILE_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.profilePicture").value(Base64Utils.encodeToString(DEFAULT_PROFILE_PICTURE)))
            .andExpect(jsonPath("$.doorno").value(DEFAULT_DOORNO.toString()))
            .andExpect(jsonPath("$.mobileNo").value(DEFAULT_MOBILE_NO.toString()))
            .andExpect(jsonPath("$.landlineNo").value(DEFAULT_LANDLINE_NO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSponsorDetails() throws Exception {
        // Get the sponsorDetails
        restSponsorDetailsMockMvc.perform(get("/api/sponsor-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSponsorDetails() throws Exception {
        // Initialize the database
        sponsorDetailsService.save(sponsorDetails);

        int databaseSizeBeforeUpdate = sponsorDetailsRepository.findAll().size();

        // Update the sponsorDetails
        SponsorDetails updatedSponsorDetails = sponsorDetailsRepository.findById(sponsorDetails.getId()).get();
        // Disconnect from session so that the updates on updatedSponsorDetails are not directly saved in db
        em.detach(updatedSponsorDetails);
        updatedSponsorDetails
            .sponsorName(UPDATED_SPONSOR_NAME)
            .gender(UPDATED_GENDER)
            .profilePicture(UPDATED_PROFILE_PICTURE)
            .profilePictureContentType(UPDATED_PROFILE_PICTURE_CONTENT_TYPE)
            .doorno(UPDATED_DOORNO)
            .mobileNo(UPDATED_MOBILE_NO)
            .landlineNo(UPDATED_LANDLINE_NO)
            .email(UPDATED_EMAIL);

        restSponsorDetailsMockMvc.perform(put("/api/sponsor-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSponsorDetails)))
            .andExpect(status().isOk());

        // Validate the SponsorDetails in the database
        List<SponsorDetails> sponsorDetailsList = sponsorDetailsRepository.findAll();
        assertThat(sponsorDetailsList).hasSize(databaseSizeBeforeUpdate);
        SponsorDetails testSponsorDetails = sponsorDetailsList.get(sponsorDetailsList.size() - 1);
        assertThat(testSponsorDetails.getSponsorName()).isEqualTo(UPDATED_SPONSOR_NAME);
        assertThat(testSponsorDetails.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testSponsorDetails.getProfilePicture()).isEqualTo(UPDATED_PROFILE_PICTURE);
        assertThat(testSponsorDetails.getProfilePictureContentType()).isEqualTo(UPDATED_PROFILE_PICTURE_CONTENT_TYPE);
        assertThat(testSponsorDetails.getDoorno()).isEqualTo(UPDATED_DOORNO);
        assertThat(testSponsorDetails.getMobileNo()).isEqualTo(UPDATED_MOBILE_NO);
        assertThat(testSponsorDetails.getLandlineNo()).isEqualTo(UPDATED_LANDLINE_NO);
        assertThat(testSponsorDetails.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingSponsorDetails() throws Exception {
        int databaseSizeBeforeUpdate = sponsorDetailsRepository.findAll().size();

        // Create the SponsorDetails

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSponsorDetailsMockMvc.perform(put("/api/sponsor-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorDetails)))
            .andExpect(status().isBadRequest());

        // Validate the SponsorDetails in the database
        List<SponsorDetails> sponsorDetailsList = sponsorDetailsRepository.findAll();
        assertThat(sponsorDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSponsorDetails() throws Exception {
        // Initialize the database
        sponsorDetailsService.save(sponsorDetails);

        int databaseSizeBeforeDelete = sponsorDetailsRepository.findAll().size();

        // Get the sponsorDetails
        restSponsorDetailsMockMvc.perform(delete("/api/sponsor-details/{id}", sponsorDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SponsorDetails> sponsorDetailsList = sponsorDetailsRepository.findAll();
        assertThat(sponsorDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SponsorDetails.class);
        SponsorDetails sponsorDetails1 = new SponsorDetails();
        sponsorDetails1.setId(1L);
        SponsorDetails sponsorDetails2 = new SponsorDetails();
        sponsorDetails2.setId(sponsorDetails1.getId());
        assertThat(sponsorDetails1).isEqualTo(sponsorDetails2);
        sponsorDetails2.setId(2L);
        assertThat(sponsorDetails1).isNotEqualTo(sponsorDetails2);
        sponsorDetails1.setId(null);
        assertThat(sponsorDetails1).isNotEqualTo(sponsorDetails2);
    }
}
