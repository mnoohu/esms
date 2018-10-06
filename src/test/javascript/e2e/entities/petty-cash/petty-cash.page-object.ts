import { element, by, ElementFinder } from 'protractor';

export class PettyCashComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-petty-cash div table .btn-danger'));
    title = element.all(by.css('jhi-petty-cash div h2#page-heading span')).first();

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

export class PettyCashUpdatePage {
    pageTitle = element(by.id('jhi-petty-cash-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    detailsInput = element(by.id('field_details'));
    cashInInput = element(by.id('field_cashIn'));
    cashOutInput = element(by.id('field_cashOut'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setDetailsInput(details) {
        await this.detailsInput.sendKeys(details);
    }

    async getDetailsInput() {
        return this.detailsInput.getAttribute('value');
    }

    async setCashInInput(cashIn) {
        await this.cashInInput.sendKeys(cashIn);
    }

    async getCashInInput() {
        return this.cashInInput.getAttribute('value');
    }

    async setCashOutInput(cashOut) {
        await this.cashOutInput.sendKeys(cashOut);
    }

    async getCashOutInput() {
        return this.cashOutInput.getAttribute('value');
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

export class PettyCashDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-pettyCash-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-pettyCash'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
