/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StreetComponentsPage, StreetDeleteDialog, StreetUpdatePage } from './street.page-object';

const expect = chai.expect;

describe('Street e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let streetUpdatePage: StreetUpdatePage;
    let streetComponentsPage: StreetComponentsPage;
    let streetDeleteDialog: StreetDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Streets', async () => {
        await navBarPage.goToEntity('street');
        streetComponentsPage = new StreetComponentsPage();
        expect(await streetComponentsPage.getTitle()).to.eq('esmsApp.street.home.title');
    });

    it('should load create Street page', async () => {
        await streetComponentsPage.clickOnCreateButton();
        streetUpdatePage = new StreetUpdatePage();
        expect(await streetUpdatePage.getPageTitle()).to.eq('esmsApp.street.home.createOrEditLabel');
        await streetUpdatePage.cancel();
    });

    it('should create and save Streets', async () => {
        const nbButtonsBeforeCreate = await streetComponentsPage.countDeleteButtons();

        await streetComponentsPage.clickOnCreateButton();
        await streetUpdatePage.setNameInput('name');
        expect(await streetUpdatePage.getNameInput()).to.eq('name');
        await streetUpdatePage.save();
        expect(await streetUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await streetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Street', async () => {
        const nbButtonsBeforeDelete = await streetComponentsPage.countDeleteButtons();
        await streetComponentsPage.clickOnLastDeleteButton();

        streetDeleteDialog = new StreetDeleteDialog();
        expect(await streetDeleteDialog.getDialogTitle()).to.eq('esmsApp.street.delete.question');
        await streetDeleteDialog.clickOnConfirmButton();

        expect(await streetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
