package org.iqra.esms.web.rest;

import org.iqra.esms.EsmsApp;

import org.iqra.esms.domain.SupportingDocuments;
import org.iqra.esms.repository.SupportingDocumentsRepository;
import org.iqra.esms.service.SupportingDocumentsService;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;


import static org.iqra.esms.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SupportingDocumentsResource REST controller.
 *
 * @see SupportingDocumentsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EsmsApp.class)
public class SupportingDocumentsResourceIntTest {

    private static final byte[] DEFAULT_DOCUMENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DOCUMENT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DOCUMENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DOCUMENT_CONTENT_TYPE = "image/png";

    @Autowired
    private SupportingDocumentsRepository supportingDocumentsRepository;
    
    @Autowired
    private SupportingDocumentsService supportingDocumentsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSupportingDocumentsMockMvc;

    private SupportingDocuments supportingDocuments;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupportingDocumentsResource supportingDocumentsResource = new SupportingDocumentsResource(supportingDocumentsService);
        this.restSupportingDocumentsMockMvc = MockMvcBuilders.standaloneSetup(supportingDocumentsResource)
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
    public static SupportingDocuments createEntity(EntityManager em) {
        SupportingDocuments supportingDocuments = new SupportingDocuments()
            .document(DEFAULT_DOCUMENT)
            .documentContentType(DEFAULT_DOCUMENT_CONTENT_TYPE);
        return supportingDocuments;
    }

    @Before
    public void initTest() {
        supportingDocuments = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupportingDocuments() throws Exception {
        int databaseSizeBeforeCreate = supportingDocumentsRepository.findAll().size();

        // Create the SupportingDocuments
        restSupportingDocumentsMockMvc.perform(post("/api/supporting-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supportingDocuments)))
            .andExpect(status().isCreated());

        // Validate the SupportingDocuments in the database
        List<SupportingDocuments> supportingDocumentsList = supportingDocumentsRepository.findAll();
        assertThat(supportingDocumentsList).hasSize(databaseSizeBeforeCreate + 1);
        SupportingDocuments testSupportingDocuments = supportingDocumentsList.get(supportingDocumentsList.size() - 1);
        assertThat(testSupportingDocuments.getDocument()).isEqualTo(DEFAULT_DOCUMENT);
        assertThat(testSupportingDocuments.getDocumentContentType()).isEqualTo(DEFAULT_DOCUMENT_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createSupportingDocumentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supportingDocumentsRepository.findAll().size();

        // Create the SupportingDocuments with an existing ID
        supportingDocuments.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupportingDocumentsMockMvc.perform(post("/api/supporting-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supportingDocuments)))
            .andExpect(status().isBadRequest());

        // Validate the SupportingDocuments in the database
        List<SupportingDocuments> supportingDocumentsList = supportingDocumentsRepository.findAll();
        assertThat(supportingDocumentsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSupportingDocuments() throws Exception {
        // Initialize the database
        supportingDocumentsRepository.saveAndFlush(supportingDocuments);

        // Get all the supportingDocumentsList
        restSupportingDocumentsMockMvc.perform(get("/api/supporting-documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supportingDocuments.getId().intValue())))
            .andExpect(jsonPath("$.[*].documentContentType").value(hasItem(DEFAULT_DOCUMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].document").value(hasItem(Base64Utils.encodeToString(DEFAULT_DOCUMENT))));
    }
    
    @Test
    @Transactional
    public void getSupportingDocuments() throws Exception {
        // Initialize the database
        supportingDocumentsRepository.saveAndFlush(supportingDocuments);

        // Get the supportingDocuments
        restSupportingDocumentsMockMvc.perform(get("/api/supporting-documents/{id}", supportingDocuments.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supportingDocuments.getId().intValue()))
            .andExpect(jsonPath("$.documentContentType").value(DEFAULT_DOCUMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.document").value(Base64Utils.encodeToString(DEFAULT_DOCUMENT)));
    }

    @Test
    @Transactional
    public void getNonExistingSupportingDocuments() throws Exception {
        // Get the supportingDocuments
        restSupportingDocumentsMockMvc.perform(get("/api/supporting-documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupportingDocuments() throws Exception {
        // Initialize the database
        supportingDocumentsService.save(supportingDocuments);

        int databaseSizeBeforeUpdate = supportingDocumentsRepository.findAll().size();

        // Update the supportingDocuments
        SupportingDocuments updatedSupportingDocuments = supportingDocumentsRepository.findById(supportingDocuments.getId()).get();
        // Disconnect from session so that the updates on updatedSupportingDocuments are not directly saved in db
        em.detach(updatedSupportingDocuments);
        updatedSupportingDocuments
            .document(UPDATED_DOCUMENT)
            .documentContentType(UPDATED_DOCUMENT_CONTENT_TYPE);

        restSupportingDocumentsMockMvc.perform(put("/api/supporting-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupportingDocuments)))
            .andExpect(status().isOk());

        // Validate the SupportingDocuments in the database
        List<SupportingDocuments> supportingDocumentsList = supportingDocumentsRepository.findAll();
        assertThat(supportingDocumentsList).hasSize(databaseSizeBeforeUpdate);
        SupportingDocuments testSupportingDocuments = supportingDocumentsList.get(supportingDocumentsList.size() - 1);
        assertThat(testSupportingDocuments.getDocument()).isEqualTo(UPDATED_DOCUMENT);
        assertThat(testSupportingDocuments.getDocumentContentType()).isEqualTo(UPDATED_DOCUMENT_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingSupportingDocuments() throws Exception {
        int databaseSizeBeforeUpdate = supportingDocumentsRepository.findAll().size();

        // Create the SupportingDocuments

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupportingDocumentsMockMvc.perform(put("/api/supporting-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supportingDocuments)))
            .andExpect(status().isBadRequest());

        // Validate the SupportingDocuments in the database
        List<SupportingDocuments> supportingDocumentsList = supportingDocumentsRepository.findAll();
        assertThat(supportingDocumentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSupportingDocuments() throws Exception {
        // Initialize the database
        supportingDocumentsService.save(supportingDocuments);

        int databaseSizeBeforeDelete = supportingDocumentsRepository.findAll().size();

        // Get the supportingDocuments
        restSupportingDocumentsMockMvc.perform(delete("/api/supporting-documents/{id}", supportingDocuments.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SupportingDocuments> supportingDocumentsList = supportingDocumentsRepository.findAll();
        assertThat(supportingDocumentsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupportingDocuments.class);
        SupportingDocuments supportingDocuments1 = new SupportingDocuments();
        supportingDocuments1.setId(1L);
        SupportingDocuments supportingDocuments2 = new SupportingDocuments();
        supportingDocuments2.setId(supportingDocuments1.getId());
        assertThat(supportingDocuments1).isEqualTo(supportingDocuments2);
        supportingDocuments2.setId(2L);
        assertThat(supportingDocuments1).isNotEqualTo(supportingDocuments2);
        supportingDocuments1.setId(null);
        assertThat(supportingDocuments1).isNotEqualTo(supportingDocuments2);
    }
}
