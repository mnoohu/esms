package org.iqra.esms.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.iqra.esms.domain.SponsorCommitments;
import org.iqra.esms.service.SponsorCommitmentsService;
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
 * REST controller for managing SponsorCommitments.
 */
@RestController
@RequestMapping("/api")
public class SponsorCommitmentsResource {

    private final Logger log = LoggerFactory.getLogger(SponsorCommitmentsResource.class);

    private static final String ENTITY_NAME = "sponsorCommitments";

    private final SponsorCommitmentsService sponsorCommitmentsService;

    public SponsorCommitmentsResource(SponsorCommitmentsService sponsorCommitmentsService) {
        this.sponsorCommitmentsService = sponsorCommitmentsService;
    }

    /**
     * POST  /sponsor-commitments : Create a new sponsorCommitments.
     *
     * @param sponsorCommitments the sponsorCommitments to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sponsorCommitments, or with status 400 (Bad Request) if the sponsorCommitments has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sponsor-commitments")
    @Timed
    public ResponseEntity<SponsorCommitments> createSponsorCommitments(@Valid @RequestBody SponsorCommitments sponsorCommitments) throws URISyntaxException {
        log.debug("REST request to save SponsorCommitments : {}", sponsorCommitments);
        if (sponsorCommitments.getId() != null) {
            throw new BadRequestAlertException("A new sponsorCommitments cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SponsorCommitments result = sponsorCommitmentsService.save(sponsorCommitments);
        return ResponseEntity.created(new URI("/api/sponsor-commitments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sponsor-commitments : Updates an existing sponsorCommitments.
     *
     * @param sponsorCommitments the sponsorCommitments to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sponsorCommitments,
     * or with status 400 (Bad Request) if the sponsorCommitments is not valid,
     * or with status 500 (Internal Server Error) if the sponsorCommitments couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sponsor-commitments")
    @Timed
    public ResponseEntity<SponsorCommitments> updateSponsorCommitments(@Valid @RequestBody SponsorCommitments sponsorCommitments) throws URISyntaxException {
        log.debug("REST request to update SponsorCommitments : {}", sponsorCommitments);
        if (sponsorCommitments.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SponsorCommitments result = sponsorCommitmentsService.save(sponsorCommitments);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sponsorCommitments.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sponsor-commitments : get all the sponsorCommitments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sponsorCommitments in body
     */
    @GetMapping("/sponsor-commitments")
    @Timed
    public List<SponsorCommitments> getAllSponsorCommitments() {
        log.debug("REST request to get all SponsorCommitments");
        return sponsorCommitmentsService.findAll();
    }

    /**
     * GET  /sponsor-commitments/:id : get the "id" sponsorCommitments.
     *
     * @param id the id of the sponsorCommitments to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sponsorCommitments, or with status 404 (Not Found)
     */
    @GetMapping("/sponsor-commitments/{id}")
    @Timed
    public ResponseEntity<SponsorCommitments> getSponsorCommitments(@PathVariable Long id) {
        log.debug("REST request to get SponsorCommitments : {}", id);
        Optional<SponsorCommitments> sponsorCommitments = sponsorCommitmentsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sponsorCommitments);
    }

    /**
     * DELETE  /sponsor-commitments/:id : delete the "id" sponsorCommitments.
     *
     * @param id the id of the sponsorCommitments to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sponsor-commitments/{id}")
    @Timed
    public ResponseEntity<Void> deleteSponsorCommitments(@PathVariable Long id) {
        log.debug("REST request to delete SponsorCommitments : {}", id);
        sponsorCommitmentsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
