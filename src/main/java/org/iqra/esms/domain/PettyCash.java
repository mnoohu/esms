package org.iqra.esms.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A PettyCash.
 */
@ApiModel(description = "Petty cash details")
@Entity
@Table(name = "petty_cash")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PettyCash implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private Instant date;

    @NotNull
    @Column(name = "details", nullable = false)
    private String details;

    @Column(name = "cash_in", precision = 10, scale = 2)
    private BigDecimal cashIn;

    @Column(name = "cash_out", precision = 10, scale = 2)
    private BigDecimal cashOut;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public PettyCash date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getDetails() {
        return details;
    }

    public PettyCash details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public BigDecimal getCashIn() {
        return cashIn;
    }

    public PettyCash cashIn(BigDecimal cashIn) {
        this.cashIn = cashIn;
        return this;
    }

    public void setCashIn(BigDecimal cashIn) {
        this.cashIn = cashIn;
    }

    public BigDecimal getCashOut() {
        return cashOut;
    }

    public PettyCash cashOut(BigDecimal cashOut) {
        this.cashOut = cashOut;
        return this;
    }

    public void setCashOut(BigDecimal cashOut) {
        this.cashOut = cashOut;
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
        PettyCash pettyCash = (PettyCash) o;
        if (pettyCash.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pettyCash.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PettyCash{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", details='" + getDetails() + "'" +
            ", cashIn=" + getCashIn() +
            ", cashOut=" + getCashOut() +
            "}";
    }
}
