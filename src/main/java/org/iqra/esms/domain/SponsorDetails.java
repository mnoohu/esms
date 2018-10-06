package org.iqra.esms.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModel;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.iqra.esms.domain.enumeration.Gender;

/**
 * A SponsorDetails.
 */
@ApiModel(description = "Sponsor and his commitment details")
@Entity
@Table(name = "sponsor_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SponsorDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "sponsor_name", nullable = false)
    private String sponsorName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    
    @Lob
    @Column(name = "profile_picture", nullable = false)
    private byte[] profilePicture;

    @Column(name = "profile_picture_content_type", nullable = false)
    private String profilePictureContentType;

    @NotNull
    @Column(name = "doorno", nullable = false)
    private String doorno;

    @NotNull
    @Column(name = "mobile_no", nullable = false)
    private String mobileNo;

    @Column(name = "landline_no")
    private String landlineNo;

    @Column(name = "email")
    private String email;

    @OneToOne
    @JoinColumn(unique = true)
    private Street street;

    @OneToOne
    @JoinColumn(unique = true)
    private Place place;

    @OneToOne
    @JoinColumn(unique = true)
    private Country country;

    @OneToMany(mappedBy = "sponsorDetails")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SponsorCommitments> commitments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSponsorName() {
        return sponsorName;
    }

    public SponsorDetails sponsorName(String sponsorName) {
        this.sponsorName = sponsorName;
        return this;
    }

    public void setSponsorName(String sponsorName) {
        this.sponsorName = sponsorName;
    }

    public Gender getGender() {
        return gender;
    }

    public SponsorDetails gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public SponsorDetails profilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
        return this;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getProfilePictureContentType() {
        return profilePictureContentType;
    }

    public SponsorDetails profilePictureContentType(String profilePictureContentType) {
        this.profilePictureContentType = profilePictureContentType;
        return this;
    }

    public void setProfilePictureContentType(String profilePictureContentType) {
        this.profilePictureContentType = profilePictureContentType;
    }

    public String getDoorno() {
        return doorno;
    }

    public SponsorDetails doorno(String doorno) {
        this.doorno = doorno;
        return this;
    }

    public void setDoorno(String doorno) {
        this.doorno = doorno;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public SponsorDetails mobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
        return this;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getLandlineNo() {
        return landlineNo;
    }

    public SponsorDetails landlineNo(String landlineNo) {
        this.landlineNo = landlineNo;
        return this;
    }

    public void setLandlineNo(String landlineNo) {
        this.landlineNo = landlineNo;
    }

    public String getEmail() {
        return email;
    }

    public SponsorDetails email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Street getStreet() {
        return street;
    }

    public SponsorDetails street(Street street) {
        this.street = street;
        return this;
    }

    public void setStreet(Street street) {
        this.street = street;
    }

    public Place getPlace() {
        return place;
    }

    public SponsorDetails place(Place place) {
        this.place = place;
        return this;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    public Country getCountry() {
        return country;
    }

    public SponsorDetails country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Set<SponsorCommitments> getCommitments() {
        return commitments;
    }

    public SponsorDetails commitments(Set<SponsorCommitments> sponsorCommitments) {
        this.commitments = sponsorCommitments;
        return this;
    }

    public SponsorDetails addCommitments(SponsorCommitments sponsorCommitments) {
        this.commitments.add(sponsorCommitments);
        sponsorCommitments.setSponsorDetails(this);
        return this;
    }

    public SponsorDetails removeCommitments(SponsorCommitments sponsorCommitments) {
        this.commitments.remove(sponsorCommitments);
        sponsorCommitments.setSponsorDetails(null);
        return this;
    }

    public void setCommitments(Set<SponsorCommitments> sponsorCommitments) {
        this.commitments = sponsorCommitments;
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
        SponsorDetails sponsorDetails = (SponsorDetails) o;
        if (sponsorDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sponsorDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SponsorDetails{" +
            "id=" + getId() +
            ", sponsorName='" + getSponsorName() + "'" +
            ", gender='" + getGender() + "'" +
            ", profilePicture='" + getProfilePicture() + "'" +
            ", profilePictureContentType='" + getProfilePictureContentType() + "'" +
            ", doorno='" + getDoorno() + "'" +
            ", mobileNo='" + getMobileNo() + "'" +
            ", landlineNo='" + getLandlineNo() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
