package org.iqra.esms.service;

import org.iqra.esms.domain.ZakaathAmount;
import org.iqra.esms.repository.ZakaathAmountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing ZakaathAmount.
 */
@Service
@Transactional
public class ZakaathAmountService {

    private final Logger log = LoggerFactory.getLogger(ZakaathAmountService.class);

    private final ZakaathAmountRepository zakaathAmountRepository;

    public ZakaathAmountService(ZakaathAmountRepository zakaathAmountRepository) {
        this.zakaathAmountRepository = zakaathAmountRepository;
    }

    /**
     * Save a zakaathAmount.
     *
     * @param zakaathAmount the entity to save
     * @return the persisted entity
     */
    public ZakaathAmount save(ZakaathAmount zakaathAmount) {
        log.debug("Request to save ZakaathAmount : {}", zakaathAmount);        return zakaathAmountRepository.save(zakaathAmount);
    }

    /**
     * Get all the zakaathAmounts.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ZakaathAmount> findAll() {
        log.debug("Request to get all ZakaathAmounts");
        return zakaathAmountRepository.findAll();
    }


    /**
     * Get one zakaathAmount by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ZakaathAmount> findOne(Long id) {
        log.debug("Request to get ZakaathAmount : {}", id);
        return zakaathAmountRepository.findById(id);
    }

    /**
     * Delete the zakaathAmount by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ZakaathAmount : {}", id);
        zakaathAmountRepository.deleteById(id);
    }
}
