package org.iqra.esms.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.iqra.esms.domain.ScholarshipDetails;
import org.iqra.esms.service.ScholarshipDetailsService;
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
 * REST controller for managing ScholarshipDetails.
 */
@RestController
@RequestMapping("/api")
public class ScholarshipDetailsResource {

    private final Logger log = LoggerFactory.getLogger(ScholarshipDetailsResource.class);

    private static final String ENTITY_NAME = "scholarshipDetails";

    private final ScholarshipDetailsService scholarshipDetailsService;

    public ScholarshipDetailsResource(ScholarshipDetailsService scholarshipDetailsService) {
        this.scholarshipDetailsService = scholarshipDetailsService;
    }

    /**
     * POST  /scholarship-details : Create a new scholarshipDetails.
     *
     * @param scholarshipDetails the scholarshipDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scholarshipDetails, or with status 400 (Bad Request) if the scholarshipDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/scholarship-details")
    @Timed
    public ResponseEntity<ScholarshipDetails> createScholarshipDetails(@Valid @RequestBody ScholarshipDetails scholarshipDetails) throws URISyntaxException {
        log.debug("REST request to save ScholarshipDetails : {}", scholarshipDetails);
        if (scholarshipDetails.getId() != null) {
            throw new BadRequestAlertException("A new scholarshipDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScholarshipDetails result = scholarshipDetailsService.save(scholarshipDetails);
        return ResponseEntity.created(new URI("/api/scholarship-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /scholarship-details : Updates an existing scholarshipDetails.
     *
     * @param scholarshipDetails the scholarshipDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scholarshipDetails,
     * or with status 400 (Bad Request) if the scholarshipDetails is not valid,
     * or with status 500 (Internal Server Error) if the scholarshipDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/scholarship-details")
    @Timed
    public ResponseEntity<ScholarshipDetails> updateScholarshipDetails(@Valid @RequestBody ScholarshipDetails scholarshipDetails) throws URISyntaxException {
        log.debug("REST request to update ScholarshipDetails : {}", scholarshipDetails);
        if (scholarshipDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ScholarshipDetails result = scholarshipDetailsService.save(scholarshipDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scholarshipDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /scholarship-details : get all the scholarshipDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of scholarshipDetails in body
     */
    @GetMapping("/scholarship-details")
    @Timed
    public ResponseEntity<List<ScholarshipDetails>> getAllScholarshipDetails(Pageable pageable) {
        log.debug("REST request to get a page of ScholarshipDetails");
        Page<ScholarshipDetails> page = scholarshipDetailsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/scholarship-details");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /scholarship-details/:id : get the "id" scholarshipDetails.
     *
     * @param id the id of the scholarshipDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scholarshipDetails, or with status 404 (Not Found)
     */
    @GetMapping("/scholarship-details/{id}")
    @Timed
    public ResponseEntity<ScholarshipDetails> getScholarshipDetails(@PathVariable Long id) {
        log.debug("REST request to get ScholarshipDetails : {}", id);
        Optional<ScholarshipDetails> scholarshipDetails = scholarshipDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(scholarshipDetails);
    }

    /**
     * DELETE  /scholarship-details/:id : delete the "id" scholarshipDetails.
     *
     * @param id the id of the scholarshipDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/scholarship-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteScholarshipDetails(@PathVariable Long id) {
        log.debug("REST request to delete ScholarshipDetails : {}", id);
        scholarshipDetailsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
