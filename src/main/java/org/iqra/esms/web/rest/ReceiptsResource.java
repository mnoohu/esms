package org.iqra.esms.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.iqra.esms.domain.Receipts;
import org.iqra.esms.service.ReceiptsService;
import org.iqra.esms.web.rest.errors.BadRequestAlertException;
import org.iqra.esms.web.rest.util.HeaderUtil;
import org.iqra.esms.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Receipts.
 */
@RestController
@RequestMapping("/api")
public class ReceiptsResource {

    private final Logger log = LoggerFactory.getLogger(ReceiptsResource.class);

    private static final String ENTITY_NAME = "receipts";

    private final ReceiptsService receiptsService;

    public ReceiptsResource(ReceiptsService receiptsService) {
        this.receiptsService = receiptsService;
    }

    /**
     * POST  /receipts : Create a new receipts.
     *
     * @param receipts the receipts to create
     * @return the ResponseEntity with status 201 (Created) and with body the new receipts, or with status 400 (Bad Request) if the receipts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/receipts")
    @Timed
    public ResponseEntity<Receipts> createReceipts(@Valid @RequestBody Receipts receipts) throws URISyntaxException {
        log.debug("REST request to save Receipts : {}", receipts);
        if (receipts.getId() != null) {
            throw new BadRequestAlertException("A new receipts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Receipts result = receiptsService.save(receipts);
        return ResponseEntity.created(new URI("/api/receipts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /receipts : Updates an existing receipts.
     *
     * @param receipts the receipts to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated receipts,
     * or with status 400 (Bad Request) if the receipts is not valid,
     * or with status 500 (Internal Server Error) if the receipts couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/receipts")
    @Timed
    public ResponseEntity<Receipts> updateReceipts(@Valid @RequestBody Receipts receipts) throws URISyntaxException {
        log.debug("REST request to update Receipts : {}", receipts);
        if (receipts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Receipts result = receiptsService.save(receipts);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, receipts.getId().toString()))
            .body(result);
    }

    /**
     * GET  /receipts : get all the receipts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of receipts in body
     */
    @GetMapping("/receipts")
    @Timed
    public ResponseEntity<List<Receipts>> getAllReceipts(Pageable pageable) {
        log.debug("REST request to get a page of Receipts");
        Page<Receipts> page = receiptsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/receipts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /receipts/:id : get the "id" receipts.
     *
     * @param id the id of the receipts to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the receipts, or with status 404 (Not Found)
     */
    @GetMapping("/receipts/{id}")
    @Timed
    public ResponseEntity<Receipts> getReceipts(@PathVariable Long id) {
        log.debug("REST request to get Receipts : {}", id);
        Optional<Receipts> receipts = receiptsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(receipts);
    }

    /**
     * DELETE  /receipts/:id : delete the "id" receipts.
     *
     * @param id the id of the receipts to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/receipts/{id}")
    @Timed
    public ResponseEntity<Void> deleteReceipts(@PathVariable Long id) {
        log.debug("REST request to delete Receipts : {}", id);
        receiptsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
