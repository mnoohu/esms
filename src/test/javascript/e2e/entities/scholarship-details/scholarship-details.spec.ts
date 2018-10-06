/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    ScholarshipDetailsComponentsPage,
    ScholarshipDetailsDeleteDialog,
    ScholarshipDetailsUpdatePage
} from './scholarship-details.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('ScholarshipDetails e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let scholarshipDetailsUpdatePage: ScholarshipDetailsUpdatePage;
    let scholarshipDetailsComponentsPage: ScholarshipDetailsComponentsPage;
    let scholarshipDetailsDeleteDialog: ScholarshipDetailsDeleteDialog;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ScholarshipDetails', async () => {
        await navBarPage.goToEntity('scholarship-details');
        scholarshipDetailsComponentsPage = new ScholarshipDetailsComponentsPage();
        expect(await scholarshipDetailsComponentsPage.getTitle()).to.eq('esmsApp.scholarshipDetails.home.title');
    });

    it('should load create ScholarshipDetails page', async () => {
        await scholarshipDetailsComponentsPage.clickOnCreateButton();
        scholarshipDetailsUpdatePage = new ScholarshipDetailsUpdatePage();
        expect(await scholarshipDetailsUpdatePage.getPageTitle()).to.eq('esmsApp.scholarshipDetails.home.createOrEditLabel');
        await scholarshipDetailsUpdatePage.cancel();
    });

    it('should create and save ScholarshipDetails', async () => {
        const nbButtonsBeforeCreate = await scholarshipDetailsComponentsPage.countDeleteButtons();

        await scholarshipDetailsComponentsPage.clickOnCreateButton();
        await scholarshipDetailsUpdatePage.applicationTypeSelectLastOption();
        await scholarshipDetailsUpdatePage.setApplicationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await scholarshipDetailsUpdatePage.getApplicationDateInput()).to.contain('2001-01-01T02:30');
        await scholarshipDetailsUpdatePage.setStudentNameInput('studentName');
        expect(await scholarshipDetailsUpdatePage.getStudentNameInput()).to.eq('studentName');
        await scholarshipDetailsUpdatePage.genderSelectLastOption();
        await scholarshipDetailsUpdatePage.setProfilePictureInput(absolutePath);
        await scholarshipDetailsUpdatePage.setDobInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await scholarshipDetailsUpdatePage.getDobInput()).to.contain('2001-01-01T02:30');
        await scholarshipDetailsUpdatePage.setDoornoInput('doorno');
        expect(await scholarshipDetailsUpdatePage.getDoornoInput()).to.eq('doorno');
        await scholarshipDetailsUpdatePage.setMobileNoInput('mobileNo');
        expect(await scholarshipDetailsUpdatePage.getMobileNoInput()).to.eq('mobileNo');
        await scholarshipDetailsUpdatePage.setLandlineNoInput('landlineNo');
        expect(await scholarshipDetailsUpdatePage.getLandlineNoInput()).to.eq('landlineNo');
        await scholarshipDetailsUpdatePage.setEmailInput('email');
        expect(await scholarshipDetailsUpdatePage.getEmailInput()).to.eq('email');
        await scholarshipDetailsUpdatePage.courseTypeSelectLastOption();
        await scholarshipDetailsUpdatePage.setCourseNameInput('courseName');
        expect(await scholarshipDetailsUpdatePage.getCourseNameInput()).to.eq('courseName');
        await scholarshipDetailsUpdatePage.setCollegeNameInput('collegeName');
        expect(await scholarshipDetailsUpdatePage.getCollegeNameInput()).to.eq('collegeName');
        await scholarshipDetailsUpdatePage.setCollegeAddressInput('collegeAddress');
        expect(await scholarshipDetailsUpdatePage.getCollegeAddressInput()).to.eq('collegeAddress');
        await scholarshipDetailsUpdatePage.setApprovedAmountInput('5');
        expect(await scholarshipDetailsUpdatePage.getApprovedAmountInput()).to.eq('5');
        await scholarshipDetailsUpdatePage.setZakaathAmountInput('5');
        expect(await scholarshipDetailsUpdatePage.getZakaathAmountInput()).to.eq('5');
        await scholarshipDetailsUpdatePage.setYearsSponsoredInput('5');
        expect(await scholarshipDetailsUpdatePage.getYearsSponsoredInput()).to.eq('5');
        await scholarshipDetailsUpdatePage.setApprovedYearInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await scholarshipDetailsUpdatePage.getApprovedYearInput()).to.contain('2001-01-01T02:30');
        await scholarshipDetailsUpdatePage.setScannedCopyOfApplicationInput(absolutePath);
        await scholarshipDetailsUpdatePage.setPaymentOnHoldInput('paymentOnHold');
        expect(await scholarshipDetailsUpdatePage.getPaymentOnHoldInput()).to.eq('paymentOnHold');
        await scholarshipDetailsUpdatePage.setCourseCompletedYearInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await scholarshipDetailsUpdatePage.getCourseCompletedYearInput()).to.contain('2001-01-01T02:30');
        await scholarshipDetailsUpdatePage.setRepaymentCompletedYearInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await scholarshipDetailsUpdatePage.getRepaymentCompletedYearInput()).to.contain('2001-01-01T02:30');
        await scholarshipDetailsUpdatePage.setHasRepaymentsInput('hasRepayments');
        expect(await scholarshipDetailsUpdatePage.getHasRepaymentsInput()).to.eq('hasRepayments');
        await scholarshipDetailsUpdatePage.streetSelectLastOption();
        await scholarshipDetailsUpdatePage.placeSelectLastOption();
        await scholarshipDetailsUpdatePage.countrySelectLastOption();
        await scholarshipDetailsUpdatePage.save();
        expect(await scholarshipDetailsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await scholarshipDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ScholarshipDetails', async () => {
        const nbButtonsBeforeDelete = await scholarshipDetailsComponentsPage.countDeleteButtons();
        await scholarshipDetailsComponentsPage.clickOnLastDeleteButton();

        scholarshipDetailsDeleteDialog = new ScholarshipDetailsDeleteDialog();
        expect(await scholarshipDetailsDeleteDialog.getDialogTitle()).to.eq('esmsApp.scholarshipDetails.delete.question');
        await scholarshipDetailsDeleteDialog.clickOnConfirmButton();

        expect(await scholarshipDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
