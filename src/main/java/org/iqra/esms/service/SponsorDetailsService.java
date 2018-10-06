package org.iqra.esms.service;

import org.iqra.esms.domain.SponsorDetails;
import org.iqra.esms.repository.SponsorDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing SponsorDetails.
 */
@Service
@Transactional
public class SponsorDetailsService {

    private final Logger log = LoggerFactory.getLogger(SponsorDetailsService.class);

    private final SponsorDetailsRepository sponsorDetailsRepository;

    public SponsorDetailsService(SponsorDetailsRepository sponsorDetailsRepository) {
        this.sponsorDetailsRepository = sponsorDetailsRepository;
    }

    /**
     * Save a sponsorDetails.
     *
     * @param sponsorDetails the entity to save
     * @return the persisted entity
     */
    public SponsorDetails save(SponsorDetails sponsorDetails) {
        log.debug("Request to save SponsorDetails : {}", sponsorDetails);        return sponsorDetailsRepository.save(sponsorDetails);
    }

    /**
     * Get all the sponsorDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SponsorDetails> findAll(Pageable pageable) {
        log.debug("Request to get all SponsorDetails");
        return sponsorDetailsRepository.findAll(pageable);
    }


    /**
     * Get one sponsorDetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<SponsorDetails> findOne(Long id) {
        log.debug("Request to get SponsorDetails : {}", id);
        return sponsorDetailsRepository.findById(id);
    }

    /**
     * Delete the sponsorDetails by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SponsorDetails : {}", id);
        sponsorDetailsRepository.deleteById(id);
    }
}
