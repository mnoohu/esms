package org.iqra.esms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SupportingDocuments.
 */
@Entity
@Table(name = "supporting_documents")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SupportingDocuments implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Lob
    @Column(name = "document", nullable = false)
    private byte[] document;

    @Column(name = "document_content_type", nullable = false)
    private String documentContentType;

    @ManyToOne
    @JsonIgnoreProperties("supportingDocuments")
    private ScholarshipDetails scholarshipDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getDocument() {
        return document;
    }

    public SupportingDocuments document(byte[] document) {
        this.document = document;
        return this;
    }

    public void setDocument(byte[] document) {
        this.document = document;
    }

    public String getDocumentContentType() {
        return documentContentType;
    }

    public SupportingDocuments documentContentType(String documentContentType) {
        this.documentContentType = documentContentType;
        return this;
    }

    public void setDocumentContentType(String documentContentType) {
        this.documentContentType = documentContentType;
    }

    public ScholarshipDetails getScholarshipDetails() {
        return scholarshipDetails;
    }

    public SupportingDocuments scholarshipDetails(ScholarshipDetails scholarshipDetails) {
        this.scholarshipDetails = scholarshipDetails;
        return this;
    }

    public void setScholarshipDetails(ScholarshipDetails scholarshipDetails) {
        this.scholarshipDetails = scholarshipDetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SupportingDocuments supportingDocuments = (SupportingDocuments) o;
        if (supportingDocuments.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supportingDocuments.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupportingDocuments{" +
            "id=" + getId() +
            ", document='" + getDocument() + "'" +
            ", documentContentType='" + getDocumentContentType() + "'" +
            "}";
    }
}
