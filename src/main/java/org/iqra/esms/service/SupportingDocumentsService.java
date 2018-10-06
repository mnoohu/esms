package org.iqra.esms.service;

import org.iqra.esms.domain.SupportingDocuments;
import org.iqra.esms.repository.SupportingDocumentsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing SupportingDocuments.
 */
@Service
@Transactional
public class SupportingDocumentsService {

    private final Logger log = LoggerFactory.getLogger(SupportingDocumentsService.class);

    private final SupportingDocumentsRepository supportingDocumentsRepository;

    public SupportingDocumentsService(SupportingDocumentsRepository supportingDocumentsRepository) {
        this.supportingDocumentsRepository = supportingDocumentsRepository;
    }

    /**
     * Save a supportingDocuments.
     *
     * @param supportingDocuments the entity to save
     * @return the persisted entity
     */
    public SupportingDocuments save(SupportingDocuments supportingDocuments) {
        log.debug("Request to save SupportingDocuments : {}", supportingDocuments);        return supportingDocumentsRepository.save(supportingDocuments);
    }

    /**
     * Get all the supportingDocuments.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<SupportingDocuments> findAll() {
        log.debug("Request to get all SupportingDocuments");
        return supportingDocumentsRepository.findAll();
    }


    /**
     * Get one supportingDocuments by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<SupportingDocuments> findOne(Long id) {
        log.debug("Request to get SupportingDocuments : {}", id);
        return supportingDocumentsRepository.findById(id);
    }

    /**
     * Delete the supportingDocuments by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SupportingDocuments : {}", id);
        supportingDocumentsRepository.deleteById(id);
    }
}
