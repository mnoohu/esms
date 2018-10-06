/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    SupportingDocumentsComponentsPage,
    SupportingDocumentsDeleteDialog,
    SupportingDocumentsUpdatePage
} from './supporting-documents.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('SupportingDocuments e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let supportingDocumentsUpdatePage: SupportingDocumentsUpdatePage;
    let supportingDocumentsComponentsPage: SupportingDocumentsComponentsPage;
    let supportingDocumentsDeleteDialog: SupportingDocumentsDeleteDialog;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SupportingDocuments', async () => {
        await navBarPage.goToEntity('supporting-documents');
        supportingDocumentsComponentsPage = new SupportingDocumentsComponentsPage();
        expect(await supportingDocumentsComponentsPage.getTitle()).to.eq('esmsApp.supportingDocuments.home.title');
    });

    it('should load create SupportingDocuments page', async () => {
        await supportingDocumentsComponentsPage.clickOnCreateButton();
        supportingDocumentsUpdatePage = new SupportingDocumentsUpdatePage();
        expect(await supportingDocumentsUpdatePage.getPageTitle()).to.eq('esmsApp.supportingDocuments.home.createOrEditLabel');
        await supportingDocumentsUpdatePage.cancel();
    });

    it('should create and save SupportingDocuments', async () => {
        const nbButtonsBeforeCreate = await supportingDocumentsComponentsPage.countDeleteButtons();

        await supportingDocumentsComponentsPage.clickOnCreateButton();
        await supportingDocumentsUpdatePage.setDocumentInput(absolutePath);
        await supportingDocumentsUpdatePage.scholarshipDetailsSelectLastOption();
        await supportingDocumentsUpdatePage.save();
        expect(await supportingDocumentsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await supportingDocumentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SupportingDocuments', async () => {
        const nbButtonsBeforeDelete = await supportingDocumentsComponentsPage.countDeleteButtons();
        await supportingDocumentsComponentsPage.clickOnLastDeleteButton();

        supportingDocumentsDeleteDialog = new SupportingDocumentsDeleteDialog();
        expect(await supportingDocumentsDeleteDialog.getDialogTitle()).to.eq('esmsApp.supportingDocuments.delete.question');
        await supportingDocumentsDeleteDialog.clickOnConfirmButton();

        expect(await supportingDocumentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
