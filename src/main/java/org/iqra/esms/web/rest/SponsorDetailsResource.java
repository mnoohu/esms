package org.iqra.esms.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.iqra.esms.domain.SponsorDetails;
import org.iqra.esms.service.SponsorDetailsService;
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
 * REST controller for managing SponsorDetails.
 */
@RestController
@RequestMapping("/api")
public class SponsorDetailsResource {

    private final Logger log = LoggerFactory.getLogger(SponsorDetailsResource.class);

    private static final String ENTITY_NAME = "sponsorDetails";

    private final SponsorDetailsService sponsorDetailsService;

    public SponsorDetailsResource(SponsorDetailsService sponsorDetailsService) {
        this.sponsorDetailsService = sponsorDetailsService;
    }

    /**
     * POST  /sponsor-details : Create a new sponsorDetails.
     *
     * @param sponsorDetails the sponsorDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sponsorDetails, or with status 400 (Bad Request) if the sponsorDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sponsor-details")
    @Timed
    public ResponseEntity<SponsorDetails> createSponsorDetails(@Valid @RequestBody SponsorDetails sponsorDetails) throws URISyntaxException {
        log.debug("REST request to save SponsorDetails : {}", sponsorDetails);
        if (sponsorDetails.getId() != null) {
            throw new BadRequestAlertException("A new sponsorDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SponsorDetails result = sponsorDetailsService.save(sponsorDetails);
        return ResponseEntity.created(new URI("/api/sponsor-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sponsor-details : Updates an existing sponsorDetails.
     *
     * @param sponsorDetails the sponsorDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sponsorDetails,
     * or with status 400 (Bad Request) if the sponsorDetails is not valid,
     * or with status 500 (Internal Server Error) if the sponsorDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sponsor-details")
    @Timed
    public ResponseEntity<SponsorDetails> updateSponsorDetails(@Valid @RequestBody SponsorDetails sponsorDetails) throws URISyntaxException {
        log.debug("REST request to update SponsorDetails : {}", sponsorDetails);
        if (sponsorDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SponsorDetails result = sponsorDetailsService.save(sponsorDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sponsorDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sponsor-details : get all the sponsorDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of sponsorDetails in body
     */
    @GetMapping("/sponsor-details")
    @Timed
    public ResponseEntity<List<SponsorDetails>> getAllSponsorDetails(Pageable pageable) {
        log.debug("REST request to get a page of SponsorDetails");
        Page<SponsorDetails> page = sponsorDetailsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sponsor-details");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sponsor-details/:id : get the "id" sponsorDetails.
     *
     * @param id the id of the sponsorDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sponsorDetails, or with status 404 (Not Found)
     */
    @GetMapping("/sponsor-details/{id}")
    @Timed
    public ResponseEntity<SponsorDetails> getSponsorDetails(@PathVariable Long id) {
        log.debug("REST request to get SponsorDetails : {}", id);
        Optional<SponsorDetails> sponsorDetails = sponsorDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sponsorDetails);
    }

    /**
     * DELETE  /sponsor-details/:id : delete the "id" sponsorDetails.
     *
     * @param id the id of the sponsorDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sponsor-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteSponsorDetails(@PathVariable Long id) {
        log.debug("REST request to delete SponsorDetails : {}", id);
        sponsorDetailsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
