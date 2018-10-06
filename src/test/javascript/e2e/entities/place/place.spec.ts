/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlaceComponentsPage, PlaceDeleteDialog, PlaceUpdatePage } from './place.page-object';

const expect = chai.expect;

describe('Place e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let placeUpdatePage: PlaceUpdatePage;
    let placeComponentsPage: PlaceComponentsPage;
    let placeDeleteDialog: PlaceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Places', async () => {
        await navBarPage.goToEntity('place');
        placeComponentsPage = new PlaceComponentsPage();
        expect(await placeComponentsPage.getTitle()).to.eq('esmsApp.place.home.title');
    });

    it('should load create Place page', async () => {
        await placeComponentsPage.clickOnCreateButton();
        placeUpdatePage = new PlaceUpdatePage();
        expect(await placeUpdatePage.getPageTitle()).to.eq('esmsApp.place.home.createOrEditLabel');
        await placeUpdatePage.cancel();
    });

    it('should create and save Places', async () => {
        const nbButtonsBeforeCreate = await placeComponentsPage.countDeleteButtons();

        await placeComponentsPage.clickOnCreateButton();
        await placeUpdatePage.setNameInput('name');
        expect(await placeUpdatePage.getNameInput()).to.eq('name');
        await placeUpdatePage.save();
        expect(await placeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await placeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Place', async () => {
        const nbButtonsBeforeDelete = await placeComponentsPage.countDeleteButtons();
        await placeComponentsPage.clickOnLastDeleteButton();

        placeDeleteDialog = new PlaceDeleteDialog();
        expect(await placeDeleteDialog.getDialogTitle()).to.eq('esmsApp.place.delete.question');
        await placeDeleteDialog.clickOnConfirmButton();

        expect(await placeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
