package org.iqra.esms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ScholarshipRemarks.
 */
@Entity
@Table(name = "scholarship_remarks")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ScholarshipRemarks implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "remarks", nullable = false)
    private String remarks;

    @ManyToOne
    @JsonIgnoreProperties("remarks")
    private ScholarshipDetails scholarshipDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRemarks() {
        return remarks;
    }

    public ScholarshipRemarks remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public ScholarshipDetails getScholarshipDetails() {
        return scholarshipDetails;
    }

    public ScholarshipRemarks scholarshipDetails(ScholarshipDetails scholarshipDetails) {
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
        ScholarshipRemarks scholarshipRemarks = (ScholarshipRemarks) o;
        if (scholarshipRemarks.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), scholarshipRemarks.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ScholarshipRemarks{" +
            "id=" + getId() +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
