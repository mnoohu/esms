package org.iqra.esms.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.iqra.esms.domain.ScholarshipRemarks;
import org.iqra.esms.service.ScholarshipRemarksService;
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
 * REST controller for managing ScholarshipRemarks.
 */
@RestController
@RequestMapping("/api")
public class ScholarshipRemarksResource {

    private final Logger log = LoggerFactory.getLogger(ScholarshipRemarksResource.class);

    private static final String ENTITY_NAME = "scholarshipRemarks";

    private final ScholarshipRemarksService scholarshipRemarksService;

    public ScholarshipRemarksResource(ScholarshipRemarksService scholarshipRemarksService) {
        this.scholarshipRemarksService = scholarshipRemarksService;
    }

    /**
     * POST  /scholarship-remarks : Create a new scholarshipRemarks.
     *
     * @param scholarshipRemarks the scholarshipRemarks to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scholarshipRemarks, or with status 400 (Bad Request) if the scholarshipRemarks has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/scholarship-remarks")
    @Timed
    public ResponseEntity<ScholarshipRemarks> createScholarshipRemarks(@Valid @RequestBody ScholarshipRemarks scholarshipRemarks) throws URISyntaxException {
        log.debug("REST request to save ScholarshipRemarks : {}", scholarshipRemarks);
        if (scholarshipRemarks.getId() != null) {
            throw new BadRequestAlertException("A new scholarshipRemarks cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScholarshipRemarks result = scholarshipRemarksService.save(scholarshipRemarks);
        return ResponseEntity.created(new URI("/api/scholarship-remarks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /scholarship-remarks : Updates an existing scholarshipRemarks.
     *
     * @param scholarshipRemarks the scholarshipRemarks to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scholarshipRemarks,
     * or with status 400 (Bad Request) if the scholarshipRemarks is not valid,
     * or with status 500 (Internal Server Error) if the scholarshipRemarks couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/scholarship-remarks")
    @Timed
    public ResponseEntity<ScholarshipRemarks> updateScholarshipRemarks(@Valid @RequestBody ScholarshipRemarks scholarshipRemarks) throws URISyntaxException {
        log.debug("REST request to update ScholarshipRemarks : {}", scholarshipRemarks);
        if (scholarshipRemarks.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ScholarshipRemarks result = scholarshipRemarksService.save(scholarshipRemarks);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scholarshipRemarks.getId().toString()))
            .body(result);
    }

    /**
     * GET  /scholarship-remarks : get all the scholarshipRemarks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scholarshipRemarks in body
     */
    @GetMapping("/scholarship-remarks")
    @Timed
    public List<ScholarshipRemarks> getAllScholarshipRemarks() {
        log.debug("REST request to get all ScholarshipRemarks");
        return scholarshipRemarksService.findAll();
    }

    /**
     * GET  /scholarship-remarks/:id : get the "id" scholarshipRemarks.
     *
     * @param id the id of the scholarshipRemarks to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scholarshipRemarks, or with status 404 (Not Found)
     */
    @GetMapping("/scholarship-remarks/{id}")
    @Timed
    public ResponseEntity<ScholarshipRemarks> getScholarshipRemarks(@PathVariable Long id) {
        log.debug("REST request to get ScholarshipRemarks : {}", id);
        Optional<ScholarshipRemarks> scholarshipRemarks = scholarshipRemarksService.findOne(id);
        return ResponseUtil.wrapOrNotFound(scholarshipRemarks);
    }

    /**
     * DELETE  /scholarship-remarks/:id : delete the "id" scholarshipRemarks.
     *
     * @param id the id of the scholarshipRemarks to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/scholarship-remarks/{id}")
    @Timed
    public ResponseEntity<Void> deleteScholarshipRemarks(@PathVariable Long id) {
        log.debug("REST request to delete ScholarshipRemarks : {}", id);
        scholarshipRemarksService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
