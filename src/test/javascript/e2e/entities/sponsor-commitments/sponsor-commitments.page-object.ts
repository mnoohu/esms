import { element, by, ElementFinder } from 'protractor';

export class SponsorCommitmentsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-sponsor-commitments div table .btn-danger'));
    title = element.all(by.css('jhi-sponsor-commitments div h2#page-heading span')).first();

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

export class SponsorCommitmentsUpdatePage {
    pageTitle = element(by.id('jhi-sponsor-commitments-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    forYearInput = element(by.id('field_forYear'));
    amountInput = element(by.id('field_amount'));
    paidInput = element(by.id('field_paid'));
    reciptNoInput = element(by.id('field_reciptNo'));
    sponsorDetailsSelect = element(by.id('field_sponsorDetails'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setForYearInput(forYear) {
        await this.forYearInput.sendKeys(forYear);
    }

    async getForYearInput() {
        return this.forYearInput.getAttribute('value');
    }

    async setAmountInput(amount) {
        await this.amountInput.sendKeys(amount);
    }

    async getAmountInput() {
        return this.amountInput.getAttribute('value');
    }

    async setPaidInput(paid) {
        await this.paidInput.sendKeys(paid);
    }

    async getPaidInput() {
        return this.paidInput.getAttribute('value');
    }

    async setReciptNoInput(reciptNo) {
        await this.reciptNoInput.sendKeys(reciptNo);
    }

    async getReciptNoInput() {
        return this.reciptNoInput.getAttribute('value');
    }

    async sponsorDetailsSelectLastOption() {
        await this.sponsorDetailsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async sponsorDetailsSelectOption(option) {
        await this.sponsorDetailsSelect.sendKeys(option);
    }

    getSponsorDetailsSelect(): ElementFinder {
        return this.sponsorDetailsSelect;
    }

    async getSponsorDetailsSelectedOption() {
        return this.sponsorDetailsSelect.element(by.css('option:checked')).getText();
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

export class SponsorCommitmentsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-sponsorCommitments-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-sponsorCommitments'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
