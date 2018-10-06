package org.iqra.esms.service;

import org.iqra.esms.domain.ScholarshipRemarks;
import org.iqra.esms.repository.ScholarshipRemarksRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing ScholarshipRemarks.
 */
@Service
@Transactional
public class ScholarshipRemarksService {

    private final Logger log = LoggerFactory.getLogger(ScholarshipRemarksService.class);

    private final ScholarshipRemarksRepository scholarshipRemarksRepository;

    public ScholarshipRemarksService(ScholarshipRemarksRepository scholarshipRemarksRepository) {
        this.scholarshipRemarksRepository = scholarshipRemarksRepository;
    }

    /**
     * Save a scholarshipRemarks.
     *
     * @param scholarshipRemarks the entity to save
     * @return the persisted entity
     */
    public ScholarshipRemarks save(ScholarshipRemarks scholarshipRemarks) {
        log.debug("Request to save ScholarshipRemarks : {}", scholarshipRemarks);        return scholarshipRemarksRepository.save(scholarshipRemarks);
    }

    /**
     * Get all the scholarshipRemarks.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ScholarshipRemarks> findAll() {
        log.debug("Request to get all ScholarshipRemarks");
        return scholarshipRemarksRepository.findAll();
    }


    /**
     * Get one scholarshipRemarks by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ScholarshipRemarks> findOne(Long id) {
        log.debug("Request to get ScholarshipRemarks : {}", id);
        return scholarshipRemarksRepository.findById(id);
    }

    /**
     * Delete the scholarshipRemarks by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ScholarshipRemarks : {}", id);
        scholarshipRemarksRepository.deleteById(id);
    }
}
