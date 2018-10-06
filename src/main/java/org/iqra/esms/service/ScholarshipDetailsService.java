package org.iqra.esms.service;

import org.iqra.esms.domain.ScholarshipDetails;
import org.iqra.esms.repository.ScholarshipDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing ScholarshipDetails.
 */
@Service
@Transactional
public class ScholarshipDetailsService {

    private final Logger log = LoggerFactory.getLogger(ScholarshipDetailsService.class);

    private final ScholarshipDetailsRepository scholarshipDetailsRepository;

    public ScholarshipDetailsService(ScholarshipDetailsRepository scholarshipDetailsRepository) {
        this.scholarshipDetailsRepository = scholarshipDetailsRepository;
    }

    /**
     * Save a scholarshipDetails.
     *
     * @param scholarshipDetails the entity to save
     * @return the persisted entity
     */
    public ScholarshipDetails save(ScholarshipDetails scholarshipDetails) {
        log.debug("Request to save ScholarshipDetails : {}", scholarshipDetails);        return scholarshipDetailsRepository.save(scholarshipDetails);
    }

    /**
     * Get all the scholarshipDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ScholarshipDetails> findAll(Pageable pageable) {
        log.debug("Request to get all ScholarshipDetails");
        return scholarshipDetailsRepository.findAll(pageable);
    }


    /**
     * Get one scholarshipDetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ScholarshipDetails> findOne(Long id) {
        log.debug("Request to get ScholarshipDetails : {}", id);
        return scholarshipDetailsRepository.findById(id);
    }

    /**
     * Delete the scholarshipDetails by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ScholarshipDetails : {}", id);
        scholarshipDetailsRepository.deleteById(id);
    }
}
