package org.iqra.esms.service;

import org.iqra.esms.domain.SponsorCommitments;
import org.iqra.esms.repository.SponsorCommitmentsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing SponsorCommitments.
 */
@Service
@Transactional
public class SponsorCommitmentsService {

    private final Logger log = LoggerFactory.getLogger(SponsorCommitmentsService.class);

    private final SponsorCommitmentsRepository sponsorCommitmentsRepository;

    public SponsorCommitmentsService(SponsorCommitmentsRepository sponsorCommitmentsRepository) {
        this.sponsorCommitmentsRepository = sponsorCommitmentsRepository;
    }

    /**
     * Save a sponsorCommitments.
     *
     * @param sponsorCommitments the entity to save
     * @return the persisted entity
     */
    public SponsorCommitments save(SponsorCommitments sponsorCommitments) {
        log.debug("Request to save SponsorCommitments : {}", sponsorCommitments);        return sponsorCommitmentsRepository.save(sponsorCommitments);
    }

    /**
     * Get all the sponsorCommitments.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<SponsorCommitments> findAll() {
        log.debug("Request to get all SponsorCommitments");
        return sponsorCommitmentsRepository.findAll();
    }


    /**
     * Get one sponsorCommitments by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<SponsorCommitments> findOne(Long id) {
        log.debug("Request to get SponsorCommitments : {}", id);
        return sponsorCommitmentsRepository.findById(id);
    }

    /**
     * Delete the sponsorCommitments by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SponsorCommitments : {}", id);
        sponsorCommitmentsRepository.deleteById(id);
    }
}
