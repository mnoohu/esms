package org.iqra.esms.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

import org.iqra.esms.domain.enumeration.ReceiptType;

import io.swagger.annotations.ApiModel;

/**
 * A Receipts.
 */
@ApiModel(description = "Receipt details")
@Entity
@Table(name = "receipts")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Receipts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "receipt_date", nullable = false)
    private Instant receiptDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "receipt_type", nullable = false)
    private ReceiptType receiptType;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal amount;

    @Column(name = "for_year")
    private Instant forYear;

    @Column(name = "remarks")
    private String remarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getReceiptDate() {
        return receiptDate;
    }

    public Receipts receiptDate(Instant receiptDate) {
        this.receiptDate = receiptDate;
        return this;
    }

    public void setReceiptDate(Instant receiptDate) {
        this.receiptDate = receiptDate;
    }

    public ReceiptType getReceiptType() {
        return receiptType;
    }

    public Receipts receiptType(ReceiptType receiptType) {
        this.receiptType = receiptType;
        return this;
    }

    public void setReceiptType(ReceiptType receiptType) {
        this.receiptType = receiptType;
    }

    public String getName() {
        return name;
    }

    public Receipts name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Receipts amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Instant getForYear() {
        return forYear;
    }

    public Receipts forYear(Instant forYear) {
        this.forYear = forYear;
        return this;
    }

    public void setForYear(Instant forYear) {
        this.forYear = forYear;
    }

    public String getRemarks() {
        return remarks;
    }

    public Receipts remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
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
        Receipts receipts = (Receipts) o;
        if (receipts.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), receipts.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Receipts{" +
            "id=" + getId() +
            ", receiptDate='" + getReceiptDate() + "'" +
            ", receiptType='" + getReceiptType() + "'" +
            ", name='" + getName() + "'" +
            ", amount=" + getAmount() +
            ", forYear='" + getForYear() + "'" +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
