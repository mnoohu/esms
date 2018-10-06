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

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.persistence.EntityManager;

import org.iqra.esms.EsmsApp;
import org.iqra.esms.domain.ScholarshipDetails;
import org.iqra.esms.domain.enumeration.ApplicationType;
import org.iqra.esms.domain.enumeration.CourseType;
import org.iqra.esms.domain.enumeration.Gender;
import org.iqra.esms.repository.ScholarshipDetailsRepository;
import org.iqra.esms.service.ScholarshipDetailsService;
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
 * Test class for the ScholarshipDetailsResource REST controller.
 *
 * @see ScholarshipDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EsmsApp.class)
@WithMockUser(username="admin", authorities={"ROLE_ADMIN"},
password = "admin")
public class ScholarshipDetailsResourceIntTest {

    private static final ApplicationType DEFAULT_APPLICATION_TYPE = ApplicationType.FREE;
    private static final ApplicationType UPDATED_APPLICATION_TYPE = ApplicationType.LOAN;

    private static final Instant DEFAULT_APPLICATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_APPLICATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_STUDENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STUDENT_NAME = "BBBBBBBBBB";

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final byte[] DEFAULT_PROFILE_PICTURE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PROFILE_PICTURE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PROFILE_PICTURE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PROFILE_PICTURE_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_DOB = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DOB = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DOORNO = "AAAAAAAAAA";
    private static final String UPDATED_DOORNO = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE_NO = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_NO = "BBBBBBBBBB";

    private static final String DEFAULT_LANDLINE_NO = "AAAAAAAAAA";
    private static final String UPDATED_LANDLINE_NO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final CourseType DEFAULT_COURSE_TYPE = CourseType.PROFESSIONAL_COURSE;
    private static final CourseType UPDATED_COURSE_TYPE = CourseType.OTHER_COURSE;

    private static final String DEFAULT_COURSE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COURSE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COLLEGE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COLLEGE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COLLEGE_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_COLLEGE_ADDRESS = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_APPROVED_AMOUNT = new BigDecimal(0);
    private static final BigDecimal UPDATED_APPROVED_AMOUNT = new BigDecimal(1);

    private static final BigDecimal DEFAULT_ZAKAATH_AMOUNT = new BigDecimal(0);
    private static final BigDecimal UPDATED_ZAKAATH_AMOUNT = new BigDecimal(1);

    private static final Integer DEFAULT_YEARS_SPONSORED = 0;
    private static final Integer UPDATED_YEARS_SPONSORED = 1;

    private static final Instant DEFAULT_APPROVED_YEAR = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_APPROVED_YEAR = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final byte[] DEFAULT_SCANNED_COPY_OF_APPLICATION = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_SCANNED_COPY_OF_APPLICATION = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_SCANNED_COPY_OF_APPLICATION_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_SCANNED_COPY_OF_APPLICATION_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_PAYMENT_ON_HOLD = "AAAAAAAAAA";
    private static final String UPDATED_PAYMENT_ON_HOLD = "BBBBBBBBBB";

    private static final Instant DEFAULT_COURSE_COMPLETED_YEAR = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_COURSE_COMPLETED_YEAR = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_REPAYMENT_COMPLETED_YEAR = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REPAYMENT_COMPLETED_YEAR = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_HAS_REPAYMENTS = "AAAAAAAAAA";
    private static final String UPDATED_HAS_REPAYMENTS = "BBBBBBBBBB";

    @Autowired
    private ScholarshipDetailsRepository scholarshipDetailsRepository;
    
    @Autowired
    private ScholarshipDetailsService scholarshipDetailsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restScholarshipDetailsMockMvc;

    private ScholarshipDetails scholarshipDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ScholarshipDetailsResource scholarshipDetailsResource = new ScholarshipDetailsResource(scholarshipDetailsService);
        this.restScholarshipDetailsMockMvc = MockMvcBuilders.standaloneSetup(scholarshipDetailsResource)
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
    public static ScholarshipDetails createEntity(EntityManager em) {
        ScholarshipDetails scholarshipDetails = new ScholarshipDetails()
            .applicationType(DEFAULT_APPLICATION_TYPE)
            .applicationDate(DEFAULT_APPLICATION_DATE)
            .studentName(DEFAULT_STUDENT_NAME)
            .gender(DEFAULT_GENDER)
            .profilePicture(DEFAULT_PROFILE_PICTURE)
            .profilePictureContentType(DEFAULT_PROFILE_PICTURE_CONTENT_TYPE)
            .dob(DEFAULT_DOB)
            .doorno(DEFAULT_DOORNO)
            .mobileNo(DEFAULT_MOBILE_NO)
            .landlineNo(DEFAULT_LANDLINE_NO)
            .email(DEFAULT_EMAIL)
            .courseType(DEFAULT_COURSE_TYPE)
            .courseName(DEFAULT_COURSE_NAME)
            .collegeName(DEFAULT_COLLEGE_NAME)
            .collegeAddress(DEFAULT_COLLEGE_ADDRESS)
            .approvedAmount(DEFAULT_APPROVED_AMOUNT)
            .zakaathAmount(DEFAULT_ZAKAATH_AMOUNT)
            .yearsSponsored(DEFAULT_YEARS_SPONSORED)
            .approvedYear(DEFAULT_APPROVED_YEAR)
            .scannedCopyOfApplication(DEFAULT_SCANNED_COPY_OF_APPLICATION)
            .scannedCopyOfApplicationContentType(DEFAULT_SCANNED_COPY_OF_APPLICATION_CONTENT_TYPE)
            .paymentOnHold(DEFAULT_PAYMENT_ON_HOLD)
            .courseCompletedYear(DEFAULT_COURSE_COMPLETED_YEAR)
            .repaymentCompletedYear(DEFAULT_REPAYMENT_COMPLETED_YEAR)
            .hasRepayments(DEFAULT_HAS_REPAYMENTS);
        return scholarshipDetails;
    }

    @Before
    public void initTest() {
        scholarshipDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createScholarshipDetails() throws Exception {
        int databaseSizeBeforeCreate = scholarshipDetailsRepository.findAll().size();

        // Create the ScholarshipDetails
        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isCreated());

        // Validate the ScholarshipDetails in the database
        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        ScholarshipDetails testScholarshipDetails = scholarshipDetailsList.get(scholarshipDetailsList.size() - 1);
        assertThat(testScholarshipDetails.getApplicationType()).isEqualTo(DEFAULT_APPLICATION_TYPE);
        assertThat(testScholarshipDetails.getApplicationDate()).isEqualTo(DEFAULT_APPLICATION_DATE);
        assertThat(testScholarshipDetails.getStudentName()).isEqualTo(DEFAULT_STUDENT_NAME);
        assertThat(testScholarshipDetails.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testScholarshipDetails.getProfilePicture()).isEqualTo(DEFAULT_PROFILE_PICTURE);
        assertThat(testScholarshipDetails.getProfilePictureContentType()).isEqualTo(DEFAULT_PROFILE_PICTURE_CONTENT_TYPE);
        assertThat(testScholarshipDetails.getDob()).isEqualTo(DEFAULT_DOB);
        assertThat(testScholarshipDetails.getDoorno()).isEqualTo(DEFAULT_DOORNO);
        assertThat(testScholarshipDetails.getMobileNo()).isEqualTo(DEFAULT_MOBILE_NO);
        assertThat(testScholarshipDetails.getLandlineNo()).isEqualTo(DEFAULT_LANDLINE_NO);
        assertThat(testScholarshipDetails.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testScholarshipDetails.getCourseType()).isEqualTo(DEFAULT_COURSE_TYPE);
        assertThat(testScholarshipDetails.getCourseName()).isEqualTo(DEFAULT_COURSE_NAME);
        assertThat(testScholarshipDetails.getCollegeName()).isEqualTo(DEFAULT_COLLEGE_NAME);
        assertThat(testScholarshipDetails.getCollegeAddress()).isEqualTo(DEFAULT_COLLEGE_ADDRESS);
        assertThat(testScholarshipDetails.getApprovedAmount()).isEqualTo(DEFAULT_APPROVED_AMOUNT);
        assertThat(testScholarshipDetails.getZakaathAmount()).isEqualTo(DEFAULT_ZAKAATH_AMOUNT);
        assertThat(testScholarshipDetails.getYearsSponsored()).isEqualTo(DEFAULT_YEARS_SPONSORED);
        assertThat(testScholarshipDetails.getApprovedYear()).isEqualTo(DEFAULT_APPROVED_YEAR);
        assertThat(testScholarshipDetails.getScannedCopyOfApplication()).isEqualTo(DEFAULT_SCANNED_COPY_OF_APPLICATION);
        assertThat(testScholarshipDetails.getScannedCopyOfApplicationContentType()).isEqualTo(DEFAULT_SCANNED_COPY_OF_APPLICATION_CONTENT_TYPE);
        assertThat(testScholarshipDetails.getPaymentOnHold()).isEqualTo(DEFAULT_PAYMENT_ON_HOLD);
        assertThat(testScholarshipDetails.getCourseCompletedYear()).isEqualTo(DEFAULT_COURSE_COMPLETED_YEAR);
        assertThat(testScholarshipDetails.getRepaymentCompletedYear()).isEqualTo(DEFAULT_REPAYMENT_COMPLETED_YEAR);
        assertThat(testScholarshipDetails.getHasRepayments()).isEqualTo(DEFAULT_HAS_REPAYMENTS);
    }

    @Test
    @Transactional
    public void createScholarshipDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scholarshipDetailsRepository.findAll().size();

        // Create the ScholarshipDetails with an existing ID
        scholarshipDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        // Validate the ScholarshipDetails in the database
        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkApplicationTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipDetailsRepository.findAll().size();
        // set the field null
        scholarshipDetails.setApplicationType(null);

        // Create the ScholarshipDetails, which fails.

        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStudentNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipDetailsRepository.findAll().size();
        // set the field null
        scholarshipDetails.setStudentName(null);

        // Create the ScholarshipDetails, which fails.

        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGenderIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipDetailsRepository.findAll().size();
        // set the field null
        scholarshipDetails.setGender(null);

        // Create the ScholarshipDetails, which fails.

        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDobIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipDetailsRepository.findAll().size();
        // set the field null
        scholarshipDetails.setDob(null);

        // Create the ScholarshipDetails, which fails.

        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDoornoIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipDetailsRepository.findAll().size();
        // set the field null
        scholarshipDetails.setDoorno(null);

        // Create the ScholarshipDetails, which fails.

        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMobileNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipDetailsRepository.findAll().size();
        // set the field null
        scholarshipDetails.setMobileNo(null);

        // Create the ScholarshipDetails, which fails.

        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCourseTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipDetailsRepository.findAll().size();
        // set the field null
        scholarshipDetails.setCourseType(null);

        // Create the ScholarshipDetails, which fails.

        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCourseNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipDetailsRepository.findAll().size();
        // set the field null
        scholarshipDetails.setCourseName(null);

        // Create the ScholarshipDetails, which fails.

        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCollegeNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipDetailsRepository.findAll().size();
        // set the field null
        scholarshipDetails.setCollegeName(null);

        // Create the ScholarshipDetails, which fails.

        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCollegeAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipDetailsRepository.findAll().size();
        // set the field null
        scholarshipDetails.setCollegeAddress(null);

        // Create the ScholarshipDetails, which fails.

        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkApprovedAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipDetailsRepository.findAll().size();
        // set the field null
        scholarshipDetails.setApprovedAmount(null);

        // Create the ScholarshipDetails, which fails.

        restScholarshipDetailsMockMvc.perform(post("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllScholarshipDetails() throws Exception {
        // Initialize the database
        scholarshipDetailsRepository.saveAndFlush(scholarshipDetails);

        // Get all the scholarshipDetailsList
        restScholarshipDetailsMockMvc.perform(get("/api/scholarship-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(scholarshipDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].applicationType").value(hasItem(DEFAULT_APPLICATION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].applicationDate").value(hasItem(DEFAULT_APPLICATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].studentName").value(hasItem(DEFAULT_STUDENT_NAME.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].profilePictureContentType").value(hasItem(DEFAULT_PROFILE_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].profilePicture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PROFILE_PICTURE))))
            .andExpect(jsonPath("$.[*].dob").value(hasItem(DEFAULT_DOB.toString())))
            .andExpect(jsonPath("$.[*].doorno").value(hasItem(DEFAULT_DOORNO.toString())))
            .andExpect(jsonPath("$.[*].mobileNo").value(hasItem(DEFAULT_MOBILE_NO.toString())))
            .andExpect(jsonPath("$.[*].landlineNo").value(hasItem(DEFAULT_LANDLINE_NO.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].courseType").value(hasItem(DEFAULT_COURSE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].courseName").value(hasItem(DEFAULT_COURSE_NAME.toString())))
            .andExpect(jsonPath("$.[*].collegeName").value(hasItem(DEFAULT_COLLEGE_NAME.toString())))
            .andExpect(jsonPath("$.[*].collegeAddress").value(hasItem(DEFAULT_COLLEGE_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].approvedAmount").value(hasItem(DEFAULT_APPROVED_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].zakaathAmount").value(hasItem(DEFAULT_ZAKAATH_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].yearsSponsored").value(hasItem(DEFAULT_YEARS_SPONSORED)))
            .andExpect(jsonPath("$.[*].approvedYear").value(hasItem(DEFAULT_APPROVED_YEAR.toString())))
            .andExpect(jsonPath("$.[*].scannedCopyOfApplicationContentType").value(hasItem(DEFAULT_SCANNED_COPY_OF_APPLICATION_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].scannedCopyOfApplication").value(hasItem(Base64Utils.encodeToString(DEFAULT_SCANNED_COPY_OF_APPLICATION))))
            .andExpect(jsonPath("$.[*].paymentOnHold").value(hasItem(DEFAULT_PAYMENT_ON_HOLD.toString())))
            .andExpect(jsonPath("$.[*].courseCompletedYear").value(hasItem(DEFAULT_COURSE_COMPLETED_YEAR.toString())))
            .andExpect(jsonPath("$.[*].repaymentCompletedYear").value(hasItem(DEFAULT_REPAYMENT_COMPLETED_YEAR.toString())))
            .andExpect(jsonPath("$.[*].hasRepayments").value(hasItem(DEFAULT_HAS_REPAYMENTS.toString())));
    }
    
    @Test
    @Transactional
    public void getScholarshipDetails() throws Exception {
        // Initialize the database
        scholarshipDetailsRepository.saveAndFlush(scholarshipDetails);

        // Get the scholarshipDetails
        restScholarshipDetailsMockMvc.perform(get("/api/scholarship-details/{id}", scholarshipDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(scholarshipDetails.getId().intValue()))
            .andExpect(jsonPath("$.applicationType").value(DEFAULT_APPLICATION_TYPE.toString()))
            .andExpect(jsonPath("$.applicationDate").value(DEFAULT_APPLICATION_DATE.toString()))
            .andExpect(jsonPath("$.studentName").value(DEFAULT_STUDENT_NAME.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.profilePictureContentType").value(DEFAULT_PROFILE_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.profilePicture").value(Base64Utils.encodeToString(DEFAULT_PROFILE_PICTURE)))
            .andExpect(jsonPath("$.dob").value(DEFAULT_DOB.toString()))
            .andExpect(jsonPath("$.doorno").value(DEFAULT_DOORNO.toString()))
            .andExpect(jsonPath("$.mobileNo").value(DEFAULT_MOBILE_NO.toString()))
            .andExpect(jsonPath("$.landlineNo").value(DEFAULT_LANDLINE_NO.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.courseType").value(DEFAULT_COURSE_TYPE.toString()))
            .andExpect(jsonPath("$.courseName").value(DEFAULT_COURSE_NAME.toString()))
            .andExpect(jsonPath("$.collegeName").value(DEFAULT_COLLEGE_NAME.toString()))
            .andExpect(jsonPath("$.collegeAddress").value(DEFAULT_COLLEGE_ADDRESS.toString()))
            .andExpect(jsonPath("$.approvedAmount").value(DEFAULT_APPROVED_AMOUNT.intValue()))
            .andExpect(jsonPath("$.zakaathAmount").value(DEFAULT_ZAKAATH_AMOUNT.intValue()))
            .andExpect(jsonPath("$.yearsSponsored").value(DEFAULT_YEARS_SPONSORED))
            .andExpect(jsonPath("$.approvedYear").value(DEFAULT_APPROVED_YEAR.toString()))
            .andExpect(jsonPath("$.scannedCopyOfApplicationContentType").value(DEFAULT_SCANNED_COPY_OF_APPLICATION_CONTENT_TYPE))
            .andExpect(jsonPath("$.scannedCopyOfApplication").value(Base64Utils.encodeToString(DEFAULT_SCANNED_COPY_OF_APPLICATION)))
            .andExpect(jsonPath("$.paymentOnHold").value(DEFAULT_PAYMENT_ON_HOLD.toString()))
            .andExpect(jsonPath("$.courseCompletedYear").value(DEFAULT_COURSE_COMPLETED_YEAR.toString()))
            .andExpect(jsonPath("$.repaymentCompletedYear").value(DEFAULT_REPAYMENT_COMPLETED_YEAR.toString()))
            .andExpect(jsonPath("$.hasRepayments").value(DEFAULT_HAS_REPAYMENTS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingScholarshipDetails() throws Exception {
        // Get the scholarshipDetails
        restScholarshipDetailsMockMvc.perform(get("/api/scholarship-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateScholarshipDetails() throws Exception {
        // Initialize the database
        scholarshipDetailsService.save(scholarshipDetails);

        int databaseSizeBeforeUpdate = scholarshipDetailsRepository.findAll().size();

        // Update the scholarshipDetails
        ScholarshipDetails updatedScholarshipDetails = scholarshipDetailsRepository.findById(scholarshipDetails.getId()).get();
        // Disconnect from session so that the updates on updatedScholarshipDetails are not directly saved in db
        em.detach(updatedScholarshipDetails);
        updatedScholarshipDetails
            .applicationType(UPDATED_APPLICATION_TYPE)
            .applicationDate(UPDATED_APPLICATION_DATE)
            .studentName(UPDATED_STUDENT_NAME)
            .gender(UPDATED_GENDER)
            .profilePicture(UPDATED_PROFILE_PICTURE)
            .profilePictureContentType(UPDATED_PROFILE_PICTURE_CONTENT_TYPE)
            .dob(UPDATED_DOB)
            .doorno(UPDATED_DOORNO)
            .mobileNo(UPDATED_MOBILE_NO)
            .landlineNo(UPDATED_LANDLINE_NO)
            .email(UPDATED_EMAIL)
            .courseType(UPDATED_COURSE_TYPE)
            .courseName(UPDATED_COURSE_NAME)
            .collegeName(UPDATED_COLLEGE_NAME)
            .collegeAddress(UPDATED_COLLEGE_ADDRESS)
            .approvedAmount(UPDATED_APPROVED_AMOUNT)
            .zakaathAmount(UPDATED_ZAKAATH_AMOUNT)
            .yearsSponsored(UPDATED_YEARS_SPONSORED)
            .approvedYear(UPDATED_APPROVED_YEAR)
            .scannedCopyOfApplication(UPDATED_SCANNED_COPY_OF_APPLICATION)
            .scannedCopyOfApplicationContentType(UPDATED_SCANNED_COPY_OF_APPLICATION_CONTENT_TYPE)
            .paymentOnHold(UPDATED_PAYMENT_ON_HOLD)
            .courseCompletedYear(UPDATED_COURSE_COMPLETED_YEAR)
            .repaymentCompletedYear(UPDATED_REPAYMENT_COMPLETED_YEAR)
            .hasRepayments(UPDATED_HAS_REPAYMENTS);

        restScholarshipDetailsMockMvc.perform(put("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedScholarshipDetails)))
            .andExpect(status().isOk());

        // Validate the ScholarshipDetails in the database
        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeUpdate);
        ScholarshipDetails testScholarshipDetails = scholarshipDetailsList.get(scholarshipDetailsList.size() - 1);
        assertThat(testScholarshipDetails.getApplicationType()).isEqualTo(UPDATED_APPLICATION_TYPE);
        assertThat(testScholarshipDetails.getApplicationDate()).isEqualTo(UPDATED_APPLICATION_DATE);
        assertThat(testScholarshipDetails.getStudentName()).isEqualTo(UPDATED_STUDENT_NAME);
        assertThat(testScholarshipDetails.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testScholarshipDetails.getProfilePicture()).isEqualTo(UPDATED_PROFILE_PICTURE);
        assertThat(testScholarshipDetails.getProfilePictureContentType()).isEqualTo(UPDATED_PROFILE_PICTURE_CONTENT_TYPE);
        assertThat(testScholarshipDetails.getDob()).isEqualTo(UPDATED_DOB);
        assertThat(testScholarshipDetails.getDoorno()).isEqualTo(UPDATED_DOORNO);
        assertThat(testScholarshipDetails.getMobileNo()).isEqualTo(UPDATED_MOBILE_NO);
        assertThat(testScholarshipDetails.getLandlineNo()).isEqualTo(UPDATED_LANDLINE_NO);
        assertThat(testScholarshipDetails.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testScholarshipDetails.getCourseType()).isEqualTo(UPDATED_COURSE_TYPE);
        assertThat(testScholarshipDetails.getCourseName()).isEqualTo(UPDATED_COURSE_NAME);
        assertThat(testScholarshipDetails.getCollegeName()).isEqualTo(UPDATED_COLLEGE_NAME);
        assertThat(testScholarshipDetails.getCollegeAddress()).isEqualTo(UPDATED_COLLEGE_ADDRESS);
        assertThat(testScholarshipDetails.getApprovedAmount()).isEqualTo(UPDATED_APPROVED_AMOUNT);
        assertThat(testScholarshipDetails.getZakaathAmount()).isEqualTo(UPDATED_ZAKAATH_AMOUNT);
        assertThat(testScholarshipDetails.getYearsSponsored()).isEqualTo(UPDATED_YEARS_SPONSORED);
        assertThat(testScholarshipDetails.getApprovedYear()).isEqualTo(UPDATED_APPROVED_YEAR);
        assertThat(testScholarshipDetails.getScannedCopyOfApplication()).isEqualTo(UPDATED_SCANNED_COPY_OF_APPLICATION);
        assertThat(testScholarshipDetails.getScannedCopyOfApplicationContentType()).isEqualTo(UPDATED_SCANNED_COPY_OF_APPLICATION_CONTENT_TYPE);
        assertThat(testScholarshipDetails.getPaymentOnHold()).isEqualTo(UPDATED_PAYMENT_ON_HOLD);
        assertThat(testScholarshipDetails.getCourseCompletedYear()).isEqualTo(UPDATED_COURSE_COMPLETED_YEAR);
        assertThat(testScholarshipDetails.getRepaymentCompletedYear()).isEqualTo(UPDATED_REPAYMENT_COMPLETED_YEAR);
        assertThat(testScholarshipDetails.getHasRepayments()).isEqualTo(UPDATED_HAS_REPAYMENTS);
    }

    @Test
    @Transactional
    public void updateNonExistingScholarshipDetails() throws Exception {
        int databaseSizeBeforeUpdate = scholarshipDetailsRepository.findAll().size();

        // Create the ScholarshipDetails

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScholarshipDetailsMockMvc.perform(put("/api/scholarship-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDetails)))
            .andExpect(status().isBadRequest());

        // Validate the ScholarshipDetails in the database
        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteScholarshipDetails() throws Exception {
        // Initialize the database
        scholarshipDetailsService.save(scholarshipDetails);

        int databaseSizeBeforeDelete = scholarshipDetailsRepository.findAll().size();

        // Get the scholarshipDetails
        restScholarshipDetailsMockMvc.perform(delete("/api/scholarship-details/{id}", scholarshipDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ScholarshipDetails> scholarshipDetailsList = scholarshipDetailsRepository.findAll();
        assertThat(scholarshipDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ScholarshipDetails.class);
        ScholarshipDetails scholarshipDetails1 = new ScholarshipDetails();
        scholarshipDetails1.setId(1L);
        ScholarshipDetails scholarshipDetails2 = new ScholarshipDetails();
        scholarshipDetails2.setId(scholarshipDetails1.getId());
        assertThat(scholarshipDetails1).isEqualTo(scholarshipDetails2);
        scholarshipDetails2.setId(2L);
        assertThat(scholarshipDetails1).isNotEqualTo(scholarshipDetails2);
        scholarshipDetails1.setId(null);
        assertThat(scholarshipDetails1).isNotEqualTo(scholarshipDetails2);
    }
}
