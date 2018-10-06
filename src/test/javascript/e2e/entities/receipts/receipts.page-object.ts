import { element, by, ElementFinder } from 'protractor';

export class ReceiptsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-receipts div table .btn-danger'));
    title = element.all(by.css('jhi-receipts div h2#page-heading span')).first();

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

export class ReceiptsUpdatePage {
    pageTitle = element(by.id('jhi-receipts-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    receiptDateInput = element(by.id('field_receiptDate'));
    receiptTypeSelect = element(by.id('field_receiptType'));
    nameInput = element(by.id('field_name'));
    amountInput = element(by.id('field_amount'));
    forYearInput = element(by.id('field_forYear'));
    remarksInput = element(by.id('field_remarks'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setReceiptDateInput(receiptDate) {
        await this.receiptDateInput.sendKeys(receiptDate);
    }

    async getReceiptDateInput() {
        return this.receiptDateInput.getAttribute('value');
    }

    async setReceiptTypeSelect(receiptType) {
        await this.receiptTypeSelect.sendKeys(receiptType);
    }

    async getReceiptTypeSelect() {
        return this.receiptTypeSelect.element(by.css('option:checked')).getText();
    }

    async receiptTypeSelectLastOption() {
        await this.receiptTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setAmountInput(amount) {
        await this.amountInput.sendKeys(amount);
    }

    async getAmountInput() {
        return this.amountInput.getAttribute('value');
    }

    async setForYearInput(forYear) {
        await this.forYearInput.sendKeys(forYear);
    }

    async getForYearInput() {
        return this.forYearInput.getAttribute('value');
    }

    async setRemarksInput(remarks) {
        await this.remarksInput.sendKeys(remarks);
    }

    async getRemarksInput() {
        return this.remarksInput.getAttribute('value');
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

export class ReceiptsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-receipts-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-receipts'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
