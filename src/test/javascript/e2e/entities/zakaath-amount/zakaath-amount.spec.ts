/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ZakaathAmountComponentsPage, ZakaathAmountDeleteDialog, ZakaathAmountUpdatePage } from './zakaath-amount.page-object';

const expect = chai.expect;

describe('ZakaathAmount e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let zakaathAmountUpdatePage: ZakaathAmountUpdatePage;
    let zakaathAmountComponentsPage: ZakaathAmountComponentsPage;
    let zakaathAmountDeleteDialog: ZakaathAmountDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ZakaathAmounts', async () => {
        await navBarPage.goToEntity('zakaath-amount');
        zakaathAmountComponentsPage = new ZakaathAmountComponentsPage();
        expect(await zakaathAmountComponentsPage.getTitle()).to.eq('esmsApp.zakaathAmount.home.title');
    });

    it('should load create ZakaathAmount page', async () => {
        await zakaathAmountComponentsPage.clickOnCreateButton();
        zakaathAmountUpdatePage = new ZakaathAmountUpdatePage();
        expect(await zakaathAmountUpdatePage.getPageTitle()).to.eq('esmsApp.zakaathAmount.home.createOrEditLabel');
        await zakaathAmountUpdatePage.cancel();
    });

    it('should create and save ZakaathAmounts', async () => {
        const nbButtonsBeforeCreate = await zakaathAmountComponentsPage.countDeleteButtons();

        await zakaathAmountComponentsPage.clickOnCreateButton();
        await zakaathAmountUpdatePage.setAmountInput('5');
        expect(await zakaathAmountUpdatePage.getAmountInput()).to.eq('5');
        await zakaathAmountUpdatePage.save();
        expect(await zakaathAmountUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await zakaathAmountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ZakaathAmount', async () => {
        const nbButtonsBeforeDelete = await zakaathAmountComponentsPage.countDeleteButtons();
        await zakaathAmountComponentsPage.clickOnLastDeleteButton();

        zakaathAmountDeleteDialog = new ZakaathAmountDeleteDialog();
        expect(await zakaathAmountDeleteDialog.getDialogTitle()).to.eq('esmsApp.zakaathAmount.delete.question');
        await zakaathAmountDeleteDialog.clickOnConfirmButton();

        expect(await zakaathAmountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
