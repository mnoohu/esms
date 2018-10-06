package org.iqra.esms.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.iqra.esms.domain.PettyCash;
import org.iqra.esms.service.PettyCashService;
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
 * REST controller for managing PettyCash.
 */
@RestController
@RequestMapping("/api")
public class PettyCashResource {

    private final Logger log = LoggerFactory.getLogger(PettyCashResource.class);

    private static final String ENTITY_NAME = "pettyCash";

    private final PettyCashService pettyCashService;

    public PettyCashResource(PettyCashService pettyCashService) {
        this.pettyCashService = pettyCashService;
    }

    /**
     * POST  /petty-cashes : Create a new pettyCash.
     *
     * @param pettyCash the pettyCash to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pettyCash, or with status 400 (Bad Request) if the pettyCash has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/petty-cashes")
    @Timed
    public ResponseEntity<PettyCash> createPettyCash(@Valid @RequestBody PettyCash pettyCash) throws URISyntaxException {
        log.debug("REST request to save PettyCash : {}", pettyCash);
        if (pettyCash.getId() != null) {
            throw new BadRequestAlertException("A new pettyCash cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PettyCash result = pettyCashService.save(pettyCash);
        return ResponseEntity.created(new URI("/api/petty-cashes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /petty-cashes : Updates an existing pettyCash.
     *
     * @param pettyCash the pettyCash to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pettyCash,
     * or with status 400 (Bad Request) if the pettyCash is not valid,
     * or with status 500 (Internal Server Error) if the pettyCash couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/petty-cashes")
    @Timed
    public ResponseEntity<PettyCash> updatePettyCash(@Valid @RequestBody PettyCash pettyCash) throws URISyntaxException {
        log.debug("REST request to update PettyCash : {}", pettyCash);
        if (pettyCash.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PettyCash result = pettyCashService.save(pettyCash);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pettyCash.getId().toString()))
            .body(result);
    }

    /**
     * GET  /petty-cashes : get all the pettyCashes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of pettyCashes in body
     */
    @GetMapping("/petty-cashes")
    @Timed
    public ResponseEntity<List<PettyCash>> getAllPettyCashes(Pageable pageable) {
        log.debug("REST request to get a page of PettyCashes");
        Page<PettyCash> page = pettyCashService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/petty-cashes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /petty-cashes/:id : get the "id" pettyCash.
     *
     * @param id the id of the pettyCash to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pettyCash, or with status 404 (Not Found)
     */
    @GetMapping("/petty-cashes/{id}")
    @Timed
    public ResponseEntity<PettyCash> getPettyCash(@PathVariable Long id) {
        log.debug("REST request to get PettyCash : {}", id);
        Optional<PettyCash> pettyCash = pettyCashService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pettyCash);
    }

    /**
     * DELETE  /petty-cashes/:id : delete the "id" pettyCash.
     *
     * @param id the id of the pettyCash to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/petty-cashes/{id}")
    @Timed
    public ResponseEntity<Void> deletePettyCash(@PathVariable Long id) {
        log.debug("REST request to delete PettyCash : {}", id);
        pettyCashService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
