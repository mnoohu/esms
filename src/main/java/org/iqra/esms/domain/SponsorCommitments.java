package org.iqra.esms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A SponsorCommitments.
 */
@Entity
@Table(name = "sponsor_commitments")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SponsorCommitments implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "for_year", nullable = false)
    private Instant forYear;

    @NotNull
    @Column(name = "amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal amount;

    @NotNull
    @Column(name = "paid", nullable = false)
    private String paid;

    @Column(name = "recipt_no")
    private Integer reciptNo;

    @ManyToOne
    @JsonIgnoreProperties("commitments")
    private SponsorDetails sponsorDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getForYear() {
        return forYear;
    }

    public SponsorCommitments forYear(Instant forYear) {
        this.forYear = forYear;
        return this;
    }

    public void setForYear(Instant forYear) {
        this.forYear = forYear;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public SponsorCommitments amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPaid() {
        return paid;
    }

    public SponsorCommitments paid(String paid) {
        this.paid = paid;
        return this;
    }

    public void setPaid(String paid) {
        this.paid = paid;
    }

    public Integer getReciptNo() {
        return reciptNo;
    }

    public SponsorCommitments reciptNo(Integer reciptNo) {
        this.reciptNo = reciptNo;
        return this;
    }

    public void setReciptNo(Integer reciptNo) {
        this.reciptNo = reciptNo;
    }

    public SponsorDetails getSponsorDetails() {
        return sponsorDetails;
    }

    public SponsorCommitments sponsorDetails(SponsorDetails sponsorDetails) {
        this.sponsorDetails = sponsorDetails;
        return this;
    }

    public void setSponsorDetails(SponsorDetails sponsorDetails) {
        this.sponsorDetails = sponsorDetails;
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
        SponsorCommitments sponsorCommitments = (SponsorCommitments) o;
        if (sponsorCommitments.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sponsorCommitments.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SponsorCommitments{" +
            "id=" + getId() +
            ", forYear='" + getForYear() + "'" +
            ", amount=" + getAmount() +
            ", paid='" + getPaid() + "'" +
            ", reciptNo=" + getReciptNo() +
            "}";
    }
}
