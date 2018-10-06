package org.iqra.esms.service;

import org.iqra.esms.domain.Receipts;
import org.iqra.esms.repository.ReceiptsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Receipts.
 */
@Service
@Transactional
public class ReceiptsService {

    private final Logger log = LoggerFactory.getLogger(ReceiptsService.class);

    private final ReceiptsRepository receiptsRepository;

    public ReceiptsService(ReceiptsRepository receiptsRepository) {
        this.receiptsRepository = receiptsRepository;
    }

    /**
     * Save a receipts.
     *
     * @param receipts the entity to save
     * @return the persisted entity
     */
    public Receipts save(Receipts receipts) {
        log.debug("Request to save Receipts : {}", receipts);        return receiptsRepository.save(receipts);
    }

    /**
     * Get all the receipts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Receipts> findAll(Pageable pageable) {
        log.debug("Request to get all Receipts");
        return receiptsRepository.findAll(pageable);
    }


    /**
     * Get one receipts by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Receipts> findOne(Long id) {
        log.debug("Request to get Receipts : {}", id);
        return receiptsRepository.findById(id);
    }

    /**
     * Delete the receipts by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Receipts : {}", id);
        receiptsRepository.deleteById(id);
    }
}
