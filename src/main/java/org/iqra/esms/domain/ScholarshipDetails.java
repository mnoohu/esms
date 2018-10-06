package org.iqra.esms.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModel;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.iqra.esms.domain.enumeration.ApplicationType;

import org.iqra.esms.domain.enumeration.Gender;

import org.iqra.esms.domain.enumeration.CourseType;

/**
 * A ScholarshipDetails.
 */
@ApiModel(description = "Scholarship received by students")
@Entity
@Table(name = "scholarship_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ScholarshipDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "application_type", nullable = false)
    private ApplicationType applicationType;

    @Column(name = "application_date")
    private Instant applicationDate;

    @NotNull
    @Column(name = "student_name", nullable = false)
    private String studentName;

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
    @Column(name = "dob", nullable = false)
    private Instant dob;

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

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "course_type", nullable = false)
    private CourseType courseType;

    @NotNull
    @Column(name = "course_name", nullable = false)
    private String courseName;

    @NotNull
    @Column(name = "college_name", nullable = false)
    private String collegeName;

    @NotNull
    @Column(name = "college_address", nullable = false)
    private String collegeAddress;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "approved_amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal approvedAmount;

    @DecimalMin(value = "0")
    @Column(name = "zakaath_amount", precision = 10, scale = 2)
    private BigDecimal zakaathAmount;

    @Min(value = 0)
    @Column(name = "years_sponsored")
    private Integer yearsSponsored;

    @Column(name = "approved_year")
    private Instant approvedYear;

    @Lob
    @Column(name = "scanned_copy_of_application")
    private byte[] scannedCopyOfApplication;

    @Column(name = "scanned_copy_of_application_content_type")
    private String scannedCopyOfApplicationContentType;

    @Column(name = "payment_on_hold")
    private String paymentOnHold;

    @Column(name = "course_completed_year")
    private Instant courseCompletedYear;

    @Column(name = "repayment_completed_year")
    private Instant repaymentCompletedYear;

    @Column(name = "has_repayments")
    private String hasRepayments;

    @OneToOne
    @JoinColumn(unique = true)
    private Street street;

    @OneToOne
    @JoinColumn(unique = true)
    private Place place;

    @OneToOne
    @JoinColumn(unique = true)
    private Country country;

    @OneToMany(mappedBy = "scholarshipDetails")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ScholarshipRemarks> remarks = new HashSet<>();

    @OneToMany(mappedBy = "scholarshipDetails")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SupportingDocuments> supportingDocuments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ApplicationType getApplicationType() {
        return applicationType;
    }

    public ScholarshipDetails applicationType(ApplicationType applicationType) {
        this.applicationType = applicationType;
        return this;
    }

    public void setApplicationType(ApplicationType applicationType) {
        this.applicationType = applicationType;
    }

    public Instant getApplicationDate() {
        return applicationDate;
    }

    public ScholarshipDetails applicationDate(Instant applicationDate) {
        this.applicationDate = applicationDate;
        return this;
    }

    public void setApplicationDate(Instant applicationDate) {
        this.applicationDate = applicationDate;
    }

    public String getStudentName() {
        return studentName;
    }

    public ScholarshipDetails studentName(String studentName) {
        this.studentName = studentName;
        return this;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Gender getGender() {
        return gender;
    }

    public ScholarshipDetails gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public ScholarshipDetails profilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
        return this;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getProfilePictureContentType() {
        return profilePictureContentType;
    }

    public ScholarshipDetails profilePictureContentType(String profilePictureContentType) {
        this.profilePictureContentType = profilePictureContentType;
        return this;
    }

    public void setProfilePictureContentType(String profilePictureContentType) {
        this.profilePictureContentType = profilePictureContentType;
    }

    public Instant getDob() {
        return dob;
    }

    public ScholarshipDetails dob(Instant dob) {
        this.dob = dob;
        return this;
    }

    public void setDob(Instant dob) {
        this.dob = dob;
    }

    public String getDoorno() {
        return doorno;
    }

    public ScholarshipDetails doorno(String doorno) {
        this.doorno = doorno;
        return this;
    }

    public void setDoorno(String doorno) {
        this.doorno = doorno;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public ScholarshipDetails mobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
        return this;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getLandlineNo() {
        return landlineNo;
    }

    public ScholarshipDetails landlineNo(String landlineNo) {
        this.landlineNo = landlineNo;
        return this;
    }

    public void setLandlineNo(String landlineNo) {
        this.landlineNo = landlineNo;
    }

    public String getEmail() {
        return email;
    }

    public ScholarshipDetails email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public CourseType getCourseType() {
        return courseType;
    }

    public ScholarshipDetails courseType(CourseType courseType) {
        this.courseType = courseType;
        return this;
    }

    public void setCourseType(CourseType courseType) {
        this.courseType = courseType;
    }

    public String getCourseName() {
        return courseName;
    }

    public ScholarshipDetails courseName(String courseName) {
        this.courseName = courseName;
        return this;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public ScholarshipDetails collegeName(String collegeName) {
        this.collegeName = collegeName;
        return this;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getCollegeAddress() {
        return collegeAddress;
    }

    public ScholarshipDetails collegeAddress(String collegeAddress) {
        this.collegeAddress = collegeAddress;
        return this;
    }

    public void setCollegeAddress(String collegeAddress) {
        this.collegeAddress = collegeAddress;
    }

    public BigDecimal getApprovedAmount() {
        return approvedAmount;
    }

    public ScholarshipDetails approvedAmount(BigDecimal approvedAmount) {
        this.approvedAmount = approvedAmount;
        return this;
    }

    public void setApprovedAmount(BigDecimal approvedAmount) {
        this.approvedAmount = approvedAmount;
    }

    public BigDecimal getZakaathAmount() {
        return zakaathAmount;
    }

    public ScholarshipDetails zakaathAmount(BigDecimal zakaathAmount) {
        this.zakaathAmount = zakaathAmount;
        return this;
    }

    public void setZakaathAmount(BigDecimal zakaathAmount) {
        this.zakaathAmount = zakaathAmount;
    }

    public Integer getYearsSponsored() {
        return yearsSponsored;
    }

    public ScholarshipDetails yearsSponsored(Integer yearsSponsored) {
        this.yearsSponsored = yearsSponsored;
        return this;
    }

    public void setYearsSponsored(Integer yearsSponsored) {
        this.yearsSponsored = yearsSponsored;
    }

    public Instant getApprovedYear() {
        return approvedYear;
    }

    public ScholarshipDetails approvedYear(Instant approvedYear) {
        this.approvedYear = approvedYear;
        return this;
    }

    public void setApprovedYear(Instant approvedYear) {
        this.approvedYear = approvedYear;
    }

    public byte[] getScannedCopyOfApplication() {
        return scannedCopyOfApplication;
    }

    public ScholarshipDetails scannedCopyOfApplication(byte[] scannedCopyOfApplication) {
        this.scannedCopyOfApplication = scannedCopyOfApplication;
        return this;
    }

    public void setScannedCopyOfApplication(byte[] scannedCopyOfApplication) {
        this.scannedCopyOfApplication = scannedCopyOfApplication;
    }

    public String getScannedCopyOfApplicationContentType() {
        return scannedCopyOfApplicationContentType;
    }

    public ScholarshipDetails scannedCopyOfApplicationContentType(String scannedCopyOfApplicationContentType) {
        this.scannedCopyOfApplicationContentType = scannedCopyOfApplicationContentType;
        return this;
    }

    public void setScannedCopyOfApplicationContentType(String scannedCopyOfApplicationContentType) {
        this.scannedCopyOfApplicationContentType = scannedCopyOfApplicationContentType;
    }

    public String getPaymentOnHold() {
        return paymentOnHold;
    }

    public ScholarshipDetails paymentOnHold(String paymentOnHold) {
        this.paymentOnHold = paymentOnHold;
        return this;
    }

    public void setPaymentOnHold(String paymentOnHold) {
        this.paymentOnHold = paymentOnHold;
    }

    public Instant getCourseCompletedYear() {
        return courseCompletedYear;
    }

    public ScholarshipDetails courseCompletedYear(Instant courseCompletedYear) {
        this.courseCompletedYear = courseCompletedYear;
        return this;
    }

    public void setCourseCompletedYear(Instant courseCompletedYear) {
        this.courseCompletedYear = courseCompletedYear;
    }

    public Instant getRepaymentCompletedYear() {
        return repaymentCompletedYear;
    }

    public ScholarshipDetails repaymentCompletedYear(Instant repaymentCompletedYear) {
        this.repaymentCompletedYear = repaymentCompletedYear;
        return this;
    }

    public void setRepaymentCompletedYear(Instant repaymentCompletedYear) {
        this.repaymentCompletedYear = repaymentCompletedYear;
    }

    public String getHasRepayments() {
        return hasRepayments;
    }

    public ScholarshipDetails hasRepayments(String hasRepayments) {
        this.hasRepayments = hasRepayments;
        return this;
    }

    public void setHasRepayments(String hasRepayments) {
        this.hasRepayments = hasRepayments;
    }

    public Street getStreet() {
        return street;
    }

    public ScholarshipDetails street(Street street) {
        this.street = street;
        return this;
    }

    public void setStreet(Street street) {
        this.street = street;
    }

    public Place getPlace() {
        return place;
    }

    public ScholarshipDetails place(Place place) {
        this.place = place;
        return this;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    public Country getCountry() {
        return country;
    }

    public ScholarshipDetails country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Set<ScholarshipRemarks> getRemarks() {
        return remarks;
    }

    public ScholarshipDetails remarks(Set<ScholarshipRemarks> scholarshipRemarks) {
        this.remarks = scholarshipRemarks;
        return this;
    }

    public ScholarshipDetails addRemarks(ScholarshipRemarks scholarshipRemarks) {
        this.remarks.add(scholarshipRemarks);
        scholarshipRemarks.setScholarshipDetails(this);
        return this;
    }

    public ScholarshipDetails removeRemarks(ScholarshipRemarks scholarshipRemarks) {
        this.remarks.remove(scholarshipRemarks);
        scholarshipRemarks.setScholarshipDetails(null);
        return this;
    }

    public void setRemarks(Set<ScholarshipRemarks> scholarshipRemarks) {
        this.remarks = scholarshipRemarks;
    }

    public Set<SupportingDocuments> getSupportingDocuments() {
        return supportingDocuments;
    }

    public ScholarshipDetails supportingDocuments(Set<SupportingDocuments> supportingDocuments) {
        this.supportingDocuments = supportingDocuments;
        return this;
    }

    public ScholarshipDetails addSupportingDocuments(SupportingDocuments supportingDocuments) {
        this.supportingDocuments.add(supportingDocuments);
        supportingDocuments.setScholarshipDetails(this);
        return this;
    }

    public ScholarshipDetails removeSupportingDocuments(SupportingDocuments supportingDocuments) {
        this.supportingDocuments.remove(supportingDocuments);
        supportingDocuments.setScholarshipDetails(null);
        return this;
    }

    public void setSupportingDocuments(Set<SupportingDocuments> supportingDocuments) {
        this.supportingDocuments = supportingDocuments;
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
        ScholarshipDetails scholarshipDetails = (ScholarshipDetails) o;
        if (scholarshipDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), scholarshipDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ScholarshipDetails{" +
            "id=" + getId() +
            ", applicationType='" + getApplicationType() + "'" +
            ", applicationDate='" + getApplicationDate() + "'" +
            ", studentName='" + getStudentName() + "'" +
            ", gender='" + getGender() + "'" +
            ", profilePicture='" + getProfilePicture() + "'" +
            ", profilePictureContentType='" + getProfilePictureContentType() + "'" +
            ", dob='" + getDob() + "'" +
            ", doorno='" + getDoorno() + "'" +
            ", mobileNo='" + getMobileNo() + "'" +
            ", landlineNo='" + getLandlineNo() + "'" +
            ", email='" + getEmail() + "'" +
            ", courseType='" + getCourseType() + "'" +
            ", courseName='" + getCourseName() + "'" +
            ", collegeName='" + getCollegeName() + "'" +
            ", collegeAddress='" + getCollegeAddress() + "'" +
            ", approvedAmount=" + getApprovedAmount() +
            ", zakaathAmount=" + getZakaathAmount() +
            ", yearsSponsored=" + getYearsSponsored() +
            ", approvedYear='" + getApprovedYear() + "'" +
            ", scannedCopyOfApplication='" + getScannedCopyOfApplication() + "'" +
            ", scannedCopyOfApplicationContentType='" + getScannedCopyOfApplicationContentType() + "'" +
            ", paymentOnHold='" + getPaymentOnHold() + "'" +
            ", courseCompletedYear='" + getCourseCompletedYear() + "'" +
            ", repaymentCompletedYear='" + getRepaymentCompletedYear() + "'" +
            ", hasRepayments='" + getHasRepayments() + "'" +
            "}";
    }
}
