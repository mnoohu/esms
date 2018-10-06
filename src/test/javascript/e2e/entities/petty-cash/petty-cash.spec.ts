/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PettyCashComponentsPage, PettyCashDeleteDialog, PettyCashUpdatePage } from './petty-cash.page-object';

const expect = chai.expect;

describe('PettyCash e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let pettyCashUpdatePage: PettyCashUpdatePage;
    let pettyCashComponentsPage: PettyCashComponentsPage;
    let pettyCashDeleteDialog: PettyCashDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PettyCashes', async () => {
        await navBarPage.goToEntity('petty-cash');
        pettyCashComponentsPage = new PettyCashComponentsPage();
        expect(await pettyCashComponentsPage.getTitle()).to.eq('esmsApp.pettyCash.home.title');
    });

    it('should load create PettyCash page', async () => {
        await pettyCashComponentsPage.clickOnCreateButton();
        pettyCashUpdatePage = new PettyCashUpdatePage();
        expect(await pettyCashUpdatePage.getPageTitle()).to.eq('esmsApp.pettyCash.home.createOrEditLabel');
        await pettyCashUpdatePage.cancel();
    });

    it('should create and save PettyCashes', async () => {
        const nbButtonsBeforeCreate = await pettyCashComponentsPage.countDeleteButtons();

        await pettyCashComponentsPage.clickOnCreateButton();
        await pettyCashUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await pettyCashUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        await pettyCashUpdatePage.setDetailsInput('details');
        expect(await pettyCashUpdatePage.getDetailsInput()).to.eq('details');
        await pettyCashUpdatePage.setCashInInput('5');
        expect(await pettyCashUpdatePage.getCashInInput()).to.eq('5');
        await pettyCashUpdatePage.setCashOutInput('5');
        expect(await pettyCashUpdatePage.getCashOutInput()).to.eq('5');
        await pettyCashUpdatePage.save();
        expect(await pettyCashUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await pettyCashComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last PettyCash', async () => {
        const nbButtonsBeforeDelete = await pettyCashComponentsPage.countDeleteButtons();
        await pettyCashComponentsPage.clickOnLastDeleteButton();

        pettyCashDeleteDialog = new PettyCashDeleteDialog();
        expect(await pettyCashDeleteDialog.getDialogTitle()).to.eq('esmsApp.pettyCash.delete.question');
        await pettyCashDeleteDialog.clickOnConfirmButton();

        expect(await pettyCashComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
