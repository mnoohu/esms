package org.iqra.esms.service;

import org.iqra.esms.domain.Place;
import org.iqra.esms.repository.PlaceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Place.
 */
@Service
@Transactional
public class PlaceService {

    private final Logger log = LoggerFactory.getLogger(PlaceService.class);

    private final PlaceRepository placeRepository;

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    /**
     * Save a place.
     *
     * @param place the entity to save
     * @return the persisted entity
     */
    public Place save(Place place) {
        log.debug("Request to save Place : {}", place);        return placeRepository.save(place);
    }

    /**
     * Get all the places.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Place> findAll() {
        log.debug("Request to get all Places");
        return placeRepository.findAll();
    }


    /**
     * Get one place by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Place> findOne(Long id) {
        log.debug("Request to get Place : {}", id);
        return placeRepository.findById(id);
    }

    /**
     * Delete the place by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Place : {}", id);
        placeRepository.deleteById(id);
    }
}
