package org.iqra.esms.service;

import org.iqra.esms.domain.PettyCash;
import org.iqra.esms.repository.PettyCashRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing PettyCash.
 */
@Service
@Transactional
public class PettyCashService {

    private final Logger log = LoggerFactory.getLogger(PettyCashService.class);

    private final PettyCashRepository pettyCashRepository;

    public PettyCashService(PettyCashRepository pettyCashRepository) {
        this.pettyCashRepository = pettyCashRepository;
    }

    /**
     * Save a pettyCash.
     *
     * @param pettyCash the entity to save
     * @return the persisted entity
     */
    public PettyCash save(PettyCash pettyCash) {
        log.debug("Request to save PettyCash : {}", pettyCash);        return pettyCashRepository.save(pettyCash);
    }

    /**
     * Get all the pettyCashes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PettyCash> findAll(Pageable pageable) {
        log.debug("Request to get all PettyCashes");
        return pettyCashRepository.findAll(pageable);
    }


    /**
     * Get one pettyCash by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<PettyCash> findOne(Long id) {
        log.debug("Request to get PettyCash : {}", id);
        return pettyCashRepository.findById(id);
    }

    /**
     * Delete the pettyCash by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PettyCash : {}", id);
        pettyCashRepository.deleteById(id);
    }
}
