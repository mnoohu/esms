import { element, by, ElementFinder } from 'protractor';

export class ScholarshipRemarksComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-scholarship-remarks div table .btn-danger'));
    title = element.all(by.css('jhi-scholarship-remarks div h2#page-heading span')).first();

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

export class ScholarshipRemarksUpdatePage {
    pageTitle = element(by.id('jhi-scholarship-remarks-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    remarksInput = element(by.id('field_remarks'));
    scholarshipDetailsSelect = element(by.id('field_scholarshipDetails'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setRemarksInput(remarks) {
        await this.remarksInput.sendKeys(remarks);
    }

    async getRemarksInput() {
        return this.remarksInput.getAttribute('value');
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

export class ScholarshipRemarksDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-scholarshipRemarks-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-scholarshipRemarks'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
