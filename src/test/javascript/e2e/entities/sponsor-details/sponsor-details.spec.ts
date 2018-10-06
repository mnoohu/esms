/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SponsorDetailsComponentsPage, SponsorDetailsDeleteDialog, SponsorDetailsUpdatePage } from './sponsor-details.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('SponsorDetails e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let sponsorDetailsUpdatePage: SponsorDetailsUpdatePage;
    let sponsorDetailsComponentsPage: SponsorDetailsComponentsPage;
    let sponsorDetailsDeleteDialog: SponsorDetailsDeleteDialog;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SponsorDetails', async () => {
        await navBarPage.goToEntity('sponsor-details');
        sponsorDetailsComponentsPage = new SponsorDetailsComponentsPage();
        expect(await sponsorDetailsComponentsPage.getTitle()).to.eq('esmsApp.sponsorDetails.home.title');
    });

    it('should load create SponsorDetails page', async () => {
        await sponsorDetailsComponentsPage.clickOnCreateButton();
        sponsorDetailsUpdatePage = new SponsorDetailsUpdatePage();
        expect(await sponsorDetailsUpdatePage.getPageTitle()).to.eq('esmsApp.sponsorDetails.home.createOrEditLabel');
        await sponsorDetailsUpdatePage.cancel();
    });

    it('should create and save SponsorDetails', async () => {
        const nbButtonsBeforeCreate = await sponsorDetailsComponentsPage.countDeleteButtons();

        await sponsorDetailsComponentsPage.clickOnCreateButton();
        await sponsorDetailsUpdatePage.setSponsorNameInput('sponsorName');
        expect(await sponsorDetailsUpdatePage.getSponsorNameInput()).to.eq('sponsorName');
        await sponsorDetailsUpdatePage.genderSelectLastOption();
        await sponsorDetailsUpdatePage.setProfilePictureInput(absolutePath);
        await sponsorDetailsUpdatePage.setDoornoInput('doorno');
        expect(await sponsorDetailsUpdatePage.getDoornoInput()).to.eq('doorno');
        await sponsorDetailsUpdatePage.setMobileNoInput('mobileNo');
        expect(await sponsorDetailsUpdatePage.getMobileNoInput()).to.eq('mobileNo');
        await sponsorDetailsUpdatePage.setLandlineNoInput('landlineNo');
        expect(await sponsorDetailsUpdatePage.getLandlineNoInput()).to.eq('landlineNo');
        await sponsorDetailsUpdatePage.setEmailInput('email');
        expect(await sponsorDetailsUpdatePage.getEmailInput()).to.eq('email');
        await sponsorDetailsUpdatePage.streetSelectLastOption();
        await sponsorDetailsUpdatePage.placeSelectLastOption();
        await sponsorDetailsUpdatePage.countrySelectLastOption();
        await sponsorDetailsUpdatePage.save();
        expect(await sponsorDetailsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await sponsorDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SponsorDetails', async () => {
        const nbButtonsBeforeDelete = await sponsorDetailsComponentsPage.countDeleteButtons();
        await sponsorDetailsComponentsPage.clickOnLastDeleteButton();

        sponsorDetailsDeleteDialog = new SponsorDetailsDeleteDialog();
        expect(await sponsorDetailsDeleteDialog.getDialogTitle()).to.eq('esmsApp.sponsorDetails.delete.question');
        await sponsorDetailsDeleteDialog.clickOnConfirmButton();

        expect(await sponsorDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
