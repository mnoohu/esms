package org.iqra.esms.web.rest;

import org.iqra.esms.EsmsApp;

import org.iqra.esms.domain.ScholarshipRemarks;
import org.iqra.esms.repository.ScholarshipRemarksRepository;
import org.iqra.esms.service.ScholarshipRemarksService;
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
import java.util.List;


import static org.iqra.esms.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ScholarshipRemarksResource REST controller.
 *
 * @see ScholarshipRemarksResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EsmsApp.class)
public class ScholarshipRemarksResourceIntTest {

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private ScholarshipRemarksRepository scholarshipRemarksRepository;
    
    @Autowired
    private ScholarshipRemarksService scholarshipRemarksService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restScholarshipRemarksMockMvc;

    private ScholarshipRemarks scholarshipRemarks;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ScholarshipRemarksResource scholarshipRemarksResource = new ScholarshipRemarksResource(scholarshipRemarksService);
        this.restScholarshipRemarksMockMvc = MockMvcBuilders.standaloneSetup(scholarshipRemarksResource)
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
    public static ScholarshipRemarks createEntity(EntityManager em) {
        ScholarshipRemarks scholarshipRemarks = new ScholarshipRemarks()
            .remarks(DEFAULT_REMARKS);
        return scholarshipRemarks;
    }

    @Before
    public void initTest() {
        scholarshipRemarks = createEntity(em);
    }

    @Test
    @Transactional
    public void createScholarshipRemarks() throws Exception {
        int databaseSizeBeforeCreate = scholarshipRemarksRepository.findAll().size();

        // Create the ScholarshipRemarks
        restScholarshipRemarksMockMvc.perform(post("/api/scholarship-remarks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipRemarks)))
            .andExpect(status().isCreated());

        // Validate the ScholarshipRemarks in the database
        List<ScholarshipRemarks> scholarshipRemarksList = scholarshipRemarksRepository.findAll();
        assertThat(scholarshipRemarksList).hasSize(databaseSizeBeforeCreate + 1);
        ScholarshipRemarks testScholarshipRemarks = scholarshipRemarksList.get(scholarshipRemarksList.size() - 1);
        assertThat(testScholarshipRemarks.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    @Transactional
    public void createScholarshipRemarksWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scholarshipRemarksRepository.findAll().size();

        // Create the ScholarshipRemarks with an existing ID
        scholarshipRemarks.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScholarshipRemarksMockMvc.perform(post("/api/scholarship-remarks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipRemarks)))
            .andExpect(status().isBadRequest());

        // Validate the ScholarshipRemarks in the database
        List<ScholarshipRemarks> scholarshipRemarksList = scholarshipRemarksRepository.findAll();
        assertThat(scholarshipRemarksList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkRemarksIsRequired() throws Exception {
        int databaseSizeBeforeTest = scholarshipRemarksRepository.findAll().size();
        // set the field null
        scholarshipRemarks.setRemarks(null);

        // Create the ScholarshipRemarks, which fails.

        restScholarshipRemarksMockMvc.perform(post("/api/scholarship-remarks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipRemarks)))
            .andExpect(status().isBadRequest());

        List<ScholarshipRemarks> scholarshipRemarksList = scholarshipRemarksRepository.findAll();
        assertThat(scholarshipRemarksList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllScholarshipRemarks() throws Exception {
        // Initialize the database
        scholarshipRemarksRepository.saveAndFlush(scholarshipRemarks);

        // Get all the scholarshipRemarksList
        restScholarshipRemarksMockMvc.perform(get("/api/scholarship-remarks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(scholarshipRemarks.getId().intValue())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())));
    }
    
    @Test
    @Transactional
    public void getScholarshipRemarks() throws Exception {
        // Initialize the database
        scholarshipRemarksRepository.saveAndFlush(scholarshipRemarks);

        // Get the scholarshipRemarks
        restScholarshipRemarksMockMvc.perform(get("/api/scholarship-remarks/{id}", scholarshipRemarks.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(scholarshipRemarks.getId().intValue()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingScholarshipRemarks() throws Exception {
        // Get the scholarshipRemarks
        restScholarshipRemarksMockMvc.perform(get("/api/scholarship-remarks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateScholarshipRemarks() throws Exception {
        // Initialize the database
        scholarshipRemarksService.save(scholarshipRemarks);

        int databaseSizeBeforeUpdate = scholarshipRemarksRepository.findAll().size();

        // Update the scholarshipRemarks
        ScholarshipRemarks updatedScholarshipRemarks = scholarshipRemarksRepository.findById(scholarshipRemarks.getId()).get();
        // Disconnect from session so that the updates on updatedScholarshipRemarks are not directly saved in db
        em.detach(updatedScholarshipRemarks);
        updatedScholarshipRemarks
            .remarks(UPDATED_REMARKS);

        restScholarshipRemarksMockMvc.perform(put("/api/scholarship-remarks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedScholarshipRemarks)))
            .andExpect(status().isOk());

        // Validate the ScholarshipRemarks in the database
        List<ScholarshipRemarks> scholarshipRemarksList = scholarshipRemarksRepository.findAll();
        assertThat(scholarshipRemarksList).hasSize(databaseSizeBeforeUpdate);
        ScholarshipRemarks testScholarshipRemarks = scholarshipRemarksList.get(scholarshipRemarksList.size() - 1);
        assertThat(testScholarshipRemarks.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    @Transactional
    public void updateNonExistingScholarshipRemarks() throws Exception {
        int databaseSizeBeforeUpdate = scholarshipRemarksRepository.findAll().size();

        // Create the ScholarshipRemarks

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScholarshipRemarksMockMvc.perform(put("/api/scholarship-remarks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipRemarks)))
            .andExpect(status().isBadRequest());

        // Validate the ScholarshipRemarks in the database
        List<ScholarshipRemarks> scholarshipRemarksList = scholarshipRemarksRepository.findAll();
        assertThat(scholarshipRemarksList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteScholarshipRemarks() throws Exception {
        // Initialize the database
        scholarshipRemarksService.save(scholarshipRemarks);

        int databaseSizeBeforeDelete = scholarshipRemarksRepository.findAll().size();

        // Get the scholarshipRemarks
        restScholarshipRemarksMockMvc.perform(delete("/api/scholarship-remarks/{id}", scholarshipRemarks.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ScholarshipRemarks> scholarshipRemarksList = scholarshipRemarksRepository.findAll();
        assertThat(scholarshipRemarksList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ScholarshipRemarks.class);
        ScholarshipRemarks scholarshipRemarks1 = new ScholarshipRemarks();
        scholarshipRemarks1.setId(1L);
        ScholarshipRemarks scholarshipRemarks2 = new ScholarshipRemarks();
        scholarshipRemarks2.setId(scholarshipRemarks1.getId());
        assertThat(scholarshipRemarks1).isEqualTo(scholarshipRemarks2);
        scholarshipRemarks2.setId(2L);
        assertThat(scholarshipRemarks1).isNotEqualTo(scholarshipRemarks2);
        scholarshipRemarks1.setId(null);
        assertThat(scholarshipRemarks1).isNotEqualTo(scholarshipRemarks2);
    }
}
