package org.iqra.esms.service;

import org.iqra.esms.domain.Street;
import org.iqra.esms.repository.StreetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Street.
 */
@Service
@Transactional
public class StreetService {

    private final Logger log = LoggerFactory.getLogger(StreetService.class);

    private final StreetRepository streetRepository;

    public StreetService(StreetRepository streetRepository) {
        this.streetRepository = streetRepository;
    }

    /**
     * Save a street.
     *
     * @param street the entity to save
     * @return the persisted entity
     */
    public Street save(Street street) {
        log.debug("Request to save Street : {}", street);        return streetRepository.save(street);
    }

    /**
     * Get all the streets.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Street> findAll() {
        log.debug("Request to get all Streets");
        return streetRepository.findAll();
    }


    /**
     * Get one street by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Street> findOne(Long id) {
        log.debug("Request to get Street : {}", id);
        return streetRepository.findById(id);
    }

    /**
     * Delete the street by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Street : {}", id);
        streetRepository.deleteById(id);
    }
}
