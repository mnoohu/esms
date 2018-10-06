/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    ScholarshipRemarksComponentsPage,
    ScholarshipRemarksDeleteDialog,
    ScholarshipRemarksUpdatePage
} from './scholarship-remarks.page-object';

const expect = chai.expect;

describe('ScholarshipRemarks e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let scholarshipRemarksUpdatePage: ScholarshipRemarksUpdatePage;
    let scholarshipRemarksComponentsPage: ScholarshipRemarksComponentsPage;
    let scholarshipRemarksDeleteDialog: ScholarshipRemarksDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ScholarshipRemarks', async () => {
        await navBarPage.goToEntity('scholarship-remarks');
        scholarshipRemarksComponentsPage = new ScholarshipRemarksComponentsPage();
        expect(await scholarshipRemarksComponentsPage.getTitle()).to.eq('esmsApp.scholarshipRemarks.home.title');
    });

    it('should load create ScholarshipRemarks page', async () => {
        await scholarshipRemarksComponentsPage.clickOnCreateButton();
        scholarshipRemarksUpdatePage = new ScholarshipRemarksUpdatePage();
        expect(await scholarshipRemarksUpdatePage.getPageTitle()).to.eq('esmsApp.scholarshipRemarks.home.createOrEditLabel');
        await scholarshipRemarksUpdatePage.cancel();
    });

    it('should create and save ScholarshipRemarks', async () => {
        const nbButtonsBeforeCreate = await scholarshipRemarksComponentsPage.countDeleteButtons();

        await scholarshipRemarksComponentsPage.clickOnCreateButton();
        await scholarshipRemarksUpdatePage.setRemarksInput('remarks');
        expect(await scholarshipRemarksUpdatePage.getRemarksInput()).to.eq('remarks');
        await scholarshipRemarksUpdatePage.scholarshipDetailsSelectLastOption();
        await scholarshipRemarksUpdatePage.save();
        expect(await scholarshipRemarksUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await scholarshipRemarksComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ScholarshipRemarks', async () => {
        const nbButtonsBeforeDelete = await scholarshipRemarksComponentsPage.countDeleteButtons();
        await scholarshipRemarksComponentsPage.clickOnLastDeleteButton();

        scholarshipRemarksDeleteDialog = new ScholarshipRemarksDeleteDialog();
        expect(await scholarshipRemarksDeleteDialog.getDialogTitle()).to.eq('esmsApp.scholarshipRemarks.delete.question');
        await scholarshipRemarksDeleteDialog.clickOnConfirmButton();

        expect(await scholarshipRemarksComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
