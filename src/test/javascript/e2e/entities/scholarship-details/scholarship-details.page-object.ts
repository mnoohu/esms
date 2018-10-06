import { element, by, ElementFinder } from 'protractor';

export class ScholarshipDetailsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-scholarship-details div table .btn-danger'));
    title = element.all(by.css('jhi-scholarship-details div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ScholarshipDetailsUpdatePage {
    pageTitle = element(by.id('jhi-scholarship-details-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    applicationTypeSelect = element(by.id('field_applicationType'));
    applicationDateInput = element(by.id('field_applicationDate'));
    studentNameInput = element(by.id('field_studentName'));
    genderSelect = element(by.id('field_gender'));
    profilePictureInput = element(by.id('file_profilePicture'));
    dobInput = element(by.id('field_dob'));
    doornoInput = element(by.id('field_doorno'));
    mobileNoInput = element(by.id('field_mobileNo'));
    landlineNoInput = element(by.id('field_landlineNo'));
    emailInput = element(by.id('field_email'));
    courseTypeSelect = element(by.id('field_courseType'));
    courseNameInput = element(by.id('field_courseName'));
    collegeNameInput = element(by.id('field_collegeName'));
    collegeAddressInput = element(by.id('field_collegeAddress'));
    approvedAmountInput = element(by.id('field_approvedAmount'));
    zakaathAmountInput = element(by.id('field_zakaathAmount'));
    yearsSponsoredInput = element(by.id('field_yearsSponsored'));
    approvedYearInput = element(by.id('field_approvedYear'));
    scannedCopyOfApplicationInput = element(by.id('file_scannedCopyOfApplication'));
    paymentOnHoldInput = element(by.id('field_paymentOnHold'));
    courseCompletedYearInput = element(by.id('field_courseCompletedYear'));
    repaymentCompletedYearInput = element(by.id('field_repaymentCompletedYear'));
    hasRepaymentsInput = element(by.id('field_hasRepayments'));
    streetSelect = element(by.id('field_street'));
    placeSelect = element(by.id('field_place'));
    countrySelect = element(by.id('field_country'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setApplicationTypeSelect(applicationType) {
        await this.applicationTypeSelect.sendKeys(applicationType);
    }

    async getApplicationTypeSelect() {
        return this.applicationTypeSelect.element(by.css('option:checked')).getText();
    }

    async applicationTypeSelectLastOption() {
        await this.applicationTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setApplicationDateInput(applicationDate) {
        await this.applicationDateInput.sendKeys(applicationDate);
    }

    async getApplicationDateInput() {
        return this.applicationDateInput.getAttribute('value');
    }

    async setStudentNameInput(studentName) {
        await this.studentNameInput.sendKeys(studentName);
    }

    async getStudentNameInput() {
        return this.studentNameInput.getAttribute('value');
    }

    async setGenderSelect(gender) {
        await this.genderSelect.sendKeys(gender);
    }

    async getGenderSelect() {
        return this.genderSelect.element(by.css('option:checked')).getText();
    }

    async genderSelectLastOption() {
        await this.genderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setProfilePictureInput(profilePicture) {
        await this.profilePictureInput.sendKeys(profilePicture);
    }

    async getProfilePictureInput() {
        return this.profilePictureInput.getAttribute('value');
    }

    async setDobInput(dob) {
        await this.dobInput.sendKeys(dob);
    }

    async getDobInput() {
        return this.dobInput.getAttribute('value');
    }

    async setDoornoInput(doorno) {
        await this.doornoInput.sendKeys(doorno);
    }

    async getDoornoInput() {
        return this.doornoInput.getAttribute('value');
    }

    async setMobileNoInput(mobileNo) {
        await this.mobileNoInput.sendKeys(mobileNo);
    }

    async getMobileNoInput() {
        return this.mobileNoInput.getAttribute('value');
    }

    async setLandlineNoInput(landlineNo) {
        await this.landlineNoInput.sendKeys(landlineNo);
    }

    async getLandlineNoInput() {
        return this.landlineNoInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setCourseTypeSelect(courseType) {
        await this.courseTypeSelect.sendKeys(courseType);
    }

    async getCourseTypeSelect() {
        return this.courseTypeSelect.element(by.css('option:checked')).getText();
    }

    async courseTypeSelectLastOption() {
        await this.courseTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setCourseNameInput(courseName) {
        await this.courseNameInput.sendKeys(courseName);
    }

    async getCourseNameInput() {
        return this.courseNameInput.getAttribute('value');
    }

    async setCollegeNameInput(collegeName) {
        await this.collegeNameInput.sendKeys(collegeName);
    }

    async getCollegeNameInput() {
        return this.collegeNameInput.getAttribute('value');
    }

    async setCollegeAddressInput(collegeAddress) {
        await this.collegeAddressInput.sendKeys(collegeAddress);
    }

    async getCollegeAddressInput() {
        return this.collegeAddressInput.getAttribute('value');
    }

    async setApprovedAmountInput(approvedAmount) {
        await this.approvedAmountInput.sendKeys(approvedAmount);
    }

    async getApprovedAmountInput() {
        return this.approvedAmountInput.getAttribute('value');
    }

    async setZakaathAmountInput(zakaathAmount) {
        await this.zakaathAmountInput.sendKeys(zakaathAmount);
    }

    async getZakaathAmountInput() {
        return this.zakaathAmountInput.getAttribute('value');
    }

    async setYearsSponsoredInput(yearsSponsored) {
        await this.yearsSponsoredInput.sendKeys(yearsSponsored);
    }

    async getYearsSponsoredInput() {
        return this.yearsSponsoredInput.getAttribute('value');
    }

    async setApprovedYearInput(approvedYear) {
        await this.approvedYearInput.sendKeys(approvedYear);
    }

    async getApprovedYearInput() {
        return this.approvedYearInput.getAttribute('value');
    }

    async setScannedCopyOfApplicationInput(scannedCopyOfApplication) {
        await this.scannedCopyOfApplicationInput.sendKeys(scannedCopyOfApplication);
    }

    async getScannedCopyOfApplicationInput() {
        return this.scannedCopyOfApplicationInput.getAttribute('value');
    }

    async setPaymentOnHoldInput(paymentOnHold) {
        await this.paymentOnHoldInput.sendKeys(paymentOnHold);
    }

    async getPaymentOnHoldInput() {
        return this.paymentOnHoldInput.getAttribute('value');
    }

    async setCourseCompletedYearInput(courseCompletedYear) {
        await this.courseCompletedYearInput.sendKeys(courseCompletedYear);
    }

    async getCourseCompletedYearInput() {
        return this.courseCompletedYearInput.getAttribute('value');
    }

    async setRepaymentCompletedYearInput(repaymentCompletedYear) {
        await this.repaymentCompletedYearInput.sendKeys(repaymentCompletedYear);
    }

    async getRepaymentCompletedYearInput() {
        return this.repaymentCompletedYearInput.getAttribute('value');
    }

    async setHasRepaymentsInput(hasRepayments) {
        await this.hasRepaymentsInput.sendKeys(hasRepayments);
    }

    async getHasRepaymentsInput() {
        return this.hasRepaymentsInput.getAttribute('value');
    }

    async streetSelectLastOption() {
        await this.streetSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async streetSelectOption(option) {
        await this.streetSelect.sendKeys(option);
    }

    getStreetSelect(): ElementFinder {
        return this.streetSelect;
    }

    async getStreetSelectedOption() {
        return this.streetSelect.element(by.css('option:checked')).getText();
    }

    async placeSelectLastOption() {
        await this.placeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async placeSelectOption(option) {
        await this.placeSelect.sendKeys(option);
    }

    getPlaceSelect(): ElementFinder {
        return this.placeSelect;
    }

    async getPlaceSelectedOption() {
        return this.placeSelect.element(by.css('option:checked')).getText();
    }

    async countrySelectLastOption() {
        await this.countrySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async countrySelectOption(option) {
        await this.countrySelect.sendKeys(option);
    }

    getCountrySelect(): ElementFinder {
        return this.countrySelect;
    }

    async getCountrySelectedOption() {
        return this.countrySelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class ScholarshipDetailsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-scholarshipDetails-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-scholarshipDetails'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
