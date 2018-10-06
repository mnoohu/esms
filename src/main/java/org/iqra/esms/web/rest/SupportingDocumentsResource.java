package org.iqra.esms.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.iqra.esms.domain.SupportingDocuments;
import org.iqra.esms.service.SupportingDocumentsService;
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
 * REST controller for managing SupportingDocuments.
 */
@RestController
@RequestMapping("/api")
public class SupportingDocumentsResource {

    private final Logger log = LoggerFactory.getLogger(SupportingDocumentsResource.class);

    private static final String ENTITY_NAME = "supportingDocuments";

    private final SupportingDocumentsService supportingDocumentsService;

    public SupportingDocumentsResource(SupportingDocumentsService supportingDocumentsService) {
        this.supportingDocumentsService = supportingDocumentsService;
    }

    /**
     * POST  /supporting-documents : Create a new supportingDocuments.
     *
     * @param supportingDocuments the supportingDocuments to create
     * @return the ResponseEntity with status 201 (Created) and with body the new supportingDocuments, or with status 400 (Bad Request) if the supportingDocuments has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/supporting-documents")
    @Timed
    public ResponseEntity<SupportingDocuments> createSupportingDocuments(@Valid @RequestBody SupportingDocuments supportingDocuments) throws URISyntaxException {
        log.debug("REST request to save SupportingDocuments : {}", supportingDocuments);
        if (supportingDocuments.getId() != null) {
            throw new BadRequestAlertException("A new supportingDocuments cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupportingDocuments result = supportingDocumentsService.save(supportingDocuments);
        return ResponseEntity.created(new URI("/api/supporting-documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /supporting-documents : Updates an existing supportingDocuments.
     *
     * @param supportingDocuments the supportingDocuments to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated supportingDocuments,
     * or with status 400 (Bad Request) if the supportingDocuments is not valid,
     * or with status 500 (Internal Server Error) if the supportingDocuments couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/supporting-documents")
    @Timed
    public ResponseEntity<SupportingDocuments> updateSupportingDocuments(@Valid @RequestBody SupportingDocuments supportingDocuments) throws URISyntaxException {
        log.debug("REST request to update SupportingDocuments : {}", supportingDocuments);
        if (supportingDocuments.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SupportingDocuments result = supportingDocumentsService.save(supportingDocuments);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, supportingDocuments.getId().toString()))
            .body(result);
    }

    /**
     * GET  /supporting-documents : get all the supportingDocuments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of supportingDocuments in body
     */
    @GetMapping("/supporting-documents")
    @Timed
    public List<SupportingDocuments> getAllSupportingDocuments() {
        log.debug("REST request to get all SupportingDocuments");
        return supportingDocumentsService.findAll();
    }

    /**
     * GET  /supporting-documents/:id : get the "id" supportingDocuments.
     *
     * @param id the id of the supportingDocuments to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the supportingDocuments, or with status 404 (Not Found)
     */
    @GetMapping("/supporting-documents/{id}")
    @Timed
    public ResponseEntity<SupportingDocuments> getSupportingDocuments(@PathVariable Long id) {
        log.debug("REST request to get SupportingDocuments : {}", id);
        Optional<SupportingDocuments> supportingDocuments = supportingDocumentsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(supportingDocuments);
    }

    /**
     * DELETE  /supporting-documents/:id : delete the "id" supportingDocuments.
     *
     * @param id the id of the supportingDocuments to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/supporting-documents/{id}")
    @Timed
    public ResponseEntity<Void> deleteSupportingDocuments(@PathVariable Long id) {
        log.debug("REST request to delete SupportingDocuments : {}", id);
        supportingDocumentsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
