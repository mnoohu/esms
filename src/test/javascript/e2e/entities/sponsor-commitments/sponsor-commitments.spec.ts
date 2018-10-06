/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    SponsorCommitmentsComponentsPage,
    SponsorCommitmentsDeleteDialog,
    SponsorCommitmentsUpdatePage
} from './sponsor-commitments.page-object';

const expect = chai.expect;

describe('SponsorCommitments e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let sponsorCommitmentsUpdatePage: SponsorCommitmentsUpdatePage;
    let sponsorCommitmentsComponentsPage: SponsorCommitmentsComponentsPage;
    let sponsorCommitmentsDeleteDialog: SponsorCommitmentsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SponsorCommitments', async () => {
        await navBarPage.goToEntity('sponsor-commitments');
        sponsorCommitmentsComponentsPage = new SponsorCommitmentsComponentsPage();
        expect(await sponsorCommitmentsComponentsPage.getTitle()).to.eq('esmsApp.sponsorCommitments.home.title');
    });

    it('should load create SponsorCommitments page', async () => {
        await sponsorCommitmentsComponentsPage.clickOnCreateButton();
        sponsorCommitmentsUpdatePage = new SponsorCommitmentsUpdatePage();
        expect(await sponsorCommitmentsUpdatePage.getPageTitle()).to.eq('esmsApp.sponsorCommitments.home.createOrEditLabel');
        await sponsorCommitmentsUpdatePage.cancel();
    });

    it('should create and save SponsorCommitments', async () => {
        const nbButtonsBeforeCreate = await sponsorCommitmentsComponentsPage.countDeleteButtons();

        await sponsorCommitmentsComponentsPage.clickOnCreateButton();
        await sponsorCommitmentsUpdatePage.setForYearInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await sponsorCommitmentsUpdatePage.getForYearInput()).to.contain('2001-01-01T02:30');
        await sponsorCommitmentsUpdatePage.setAmountInput('5');
        expect(await sponsorCommitmentsUpdatePage.getAmountInput()).to.eq('5');
        await sponsorCommitmentsUpdatePage.setPaidInput('paid');
        expect(await sponsorCommitmentsUpdatePage.getPaidInput()).to.eq('paid');
        await sponsorCommitmentsUpdatePage.setReciptNoInput('5');
        expect(await sponsorCommitmentsUpdatePage.getReciptNoInput()).to.eq('5');
        await sponsorCommitmentsUpdatePage.sponsorDetailsSelectLastOption();
        await sponsorCommitmentsUpdatePage.save();
        expect(await sponsorCommitmentsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await sponsorCommitmentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SponsorCommitments', async () => {
        const nbButtonsBeforeDelete = await sponsorCommitmentsComponentsPage.countDeleteButtons();
        await sponsorCommitmentsComponentsPage.clickOnLastDeleteButton();

        sponsorCommitmentsDeleteDialog = new SponsorCommitmentsDeleteDialog();
        expect(await sponsorCommitmentsDeleteDialog.getDialogTitle()).to.eq('esmsApp.sponsorCommitments.delete.question');
        await sponsorCommitmentsDeleteDialog.clickOnConfirmButton();

        expect(await sponsorCommitmentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
