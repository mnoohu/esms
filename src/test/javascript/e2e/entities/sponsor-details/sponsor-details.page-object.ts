import { element, by, ElementFinder } from 'protractor';

export class SponsorDetailsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-sponsor-details div table .btn-danger'));
    title = element.all(by.css('jhi-sponsor-details div h2#page-heading span')).first();

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

export class SponsorDetailsUpdatePage {
    pageTitle = element(by.id('jhi-sponsor-details-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    sponsorNameInput = element(by.id('field_sponsorName'));
    genderSelect = element(by.id('field_gender'));
    profilePictureInput = element(by.id('file_profilePicture'));
    doornoInput = element(by.id('field_doorno'));
    mobileNoInput = element(by.id('field_mobileNo'));
    landlineNoInput = element(by.id('field_landlineNo'));
    emailInput = element(by.id('field_email'));
    streetSelect = element(by.id('field_street'));
    placeSelect = element(by.id('field_place'));
    countrySelect = element(by.id('field_country'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setSponsorNameInput(sponsorName) {
        await this.sponsorNameInput.sendKeys(sponsorName);
    }

    async getSponsorNameInput() {
        return this.sponsorNameInput.getAttribute('value');
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

export class SponsorDetailsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-sponsorDetails-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-sponsorDetails'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
