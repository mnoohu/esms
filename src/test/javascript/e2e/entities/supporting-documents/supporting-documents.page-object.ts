import { element, by, ElementFinder } from 'protractor';

export class SupportingDocumentsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-supporting-documents div table .btn-danger'));
    title = element.all(by.css('jhi-supporting-documents div h2#page-heading span')).first();

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

export class SupportingDocumentsUpdatePage {
    pageTitle = element(by.id('jhi-supporting-documents-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    documentInput = element(by.id('file_document'));
    scholarshipDetailsSelect = element(by.id('field_scholarshipDetails'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDocumentInput(document) {
        await this.documentInput.sendKeys(document);
    }

    async getDocumentInput() {
        return this.documentInput.getAttribute('value');
    }

    async scholarshipDetailsSelectLastOption() {
        await this.scholarshipDetailsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async scholarshipDetailsSelectOption(option) {
        await this.scholarshipDetailsSelect.sendKeys(option);
    }

    getScholarshipDetailsSelect(): ElementFinder {
        return this.scholarshipDetailsSelect;
    }

    async getScholarshipDetailsSelectedOption() {
        return this.scholarshipDetailsSelect.element(by.css('option:checked')).getText();
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

export class SupportingDocumentsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-supportingDocuments-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-supportingDocuments'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
