package org.iqra.esms.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.iqra.esms.domain.ZakaathAmount;
import org.iqra.esms.service.ZakaathAmountService;
import org.iqra.esms.web.rest.errors.BadRequestAlertException;
import org.iqra.esms.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ZakaathAmount.
 */
@RestController
@RequestMapping("/api")
public class ZakaathAmountResource {

    private final Logger log = LoggerFactory.getLogger(ZakaathAmountResource.class);

    private static final String ENTITY_NAME = "zakaathAmount";

    private final ZakaathAmountService zakaathAmountService;

    public ZakaathAmountResource(ZakaathAmountService zakaathAmountService) {
        this.zakaathAmountService = zakaathAmountService;
    }

    /**
     * POST  /zakaath-amounts : Create a new zakaathAmount.
     *
     * @param zakaathAmount the zakaathAmount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new zakaathAmount, or with status 400 (Bad Request) if the zakaathAmount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/zakaath-amounts")
    @Timed
    public ResponseEntity<ZakaathAmount> createZakaathAmount(@Valid @RequestBody ZakaathAmount zakaathAmount) throws URISyntaxException {
        log.debug("REST request to save ZakaathAmount : {}", zakaathAmount);
        if (zakaathAmount.getId() != null) {
            throw new BadRequestAlertException("A new zakaathAmount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ZakaathAmount result = zakaathAmountService.save(zakaathAmount);
        return ResponseEntity.created(new URI("/api/zakaath-amounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /zakaath-amounts : Updates an existing zakaathAmount.
     *
     * @param zakaathAmount the zakaathAmount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated zakaathAmount,
     * or with status 400 (Bad Request) if the zakaathAmount is not valid,
     * or with status 500 (Internal Server Error) if the zakaathAmount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/zakaath-amounts")
    @Timed
    public ResponseEntity<ZakaathAmount> updateZakaathAmount(@Valid @RequestBody ZakaathAmount zakaathAmount) throws URISyntaxException {
        log.debug("REST request to update ZakaathAmount : {}", zakaathAmount);
        if (zakaathAmount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ZakaathAmount result = zakaathAmountService.save(zakaathAmount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, zakaathAmount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /zakaath-amounts : get all the zakaathAmounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of zakaathAmounts in body
     */
    @GetMapping("/zakaath-amounts")
    @Timed
    public List<ZakaathAmount> getAllZakaathAmounts() {
        log.debug("REST request to get all ZakaathAmounts");
        return zakaathAmountService.findAll();
    }

    /**
     * GET  /zakaath-amounts/:id : get the "id" zakaathAmount.
     *
     * @param id the id of the zakaathAmount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the zakaathAmount, or with status 404 (Not Found)
     */
    @GetMapping("/zakaath-amounts/{id}")
    @Timed
    public ResponseEntity<ZakaathAmount> getZakaathAmount(@PathVariable Long id) {
        log.debug("REST request to get ZakaathAmount : {}", id);
        Optional<ZakaathAmount> zakaathAmount = zakaathAmountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(zakaathAmount);
    }

    /**
     * DELETE  /zakaath-amounts/:id : delete the "id" zakaathAmount.
     *
     * @param id the id of the zakaathAmount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/zakaath-amounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteZakaathAmount(@PathVariable Long id) {
        log.debug("REST request to delete ZakaathAmount : {}", id);
        zakaathAmountService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
