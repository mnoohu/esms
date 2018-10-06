/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReceiptsComponentsPage, ReceiptsDeleteDialog, ReceiptsUpdatePage } from './receipts.page-object';

const expect = chai.expect;

describe('Receipts e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let receiptsUpdatePage: ReceiptsUpdatePage;
    let receiptsComponentsPage: ReceiptsComponentsPage;
    let receiptsDeleteDialog: ReceiptsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Receipts', async () => {
        await navBarPage.goToEntity('receipts');
        receiptsComponentsPage = new ReceiptsComponentsPage();
        expect(await receiptsComponentsPage.getTitle()).to.eq('esmsApp.receipts.home.title');
    });

    it('should load create Receipts page', async () => {
        await receiptsComponentsPage.clickOnCreateButton();
        receiptsUpdatePage = new ReceiptsUpdatePage();
        expect(await receiptsUpdatePage.getPageTitle()).to.eq('esmsApp.receipts.home.createOrEditLabel');
        await receiptsUpdatePage.cancel();
    });

    it('should create and save Receipts', async () => {
        const nbButtonsBeforeCreate = await receiptsComponentsPage.countDeleteButtons();

        await receiptsComponentsPage.clickOnCreateButton();
        await receiptsUpdatePage.setReceiptDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await receiptsUpdatePage.getReceiptDateInput()).to.contain('2001-01-01T02:30');
        await receiptsUpdatePage.receiptTypeSelectLastOption();
        await receiptsUpdatePage.setNameInput('name');
        expect(await receiptsUpdatePage.getNameInput()).to.eq('name');
        await receiptsUpdatePage.setAmountInput('5');
        expect(await receiptsUpdatePage.getAmountInput()).to.eq('5');
        await receiptsUpdatePage.setForYearInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await receiptsUpdatePage.getForYearInput()).to.contain('2001-01-01T02:30');
        await receiptsUpdatePage.setRemarksInput('remarks');
        expect(await receiptsUpdatePage.getRemarksInput()).to.eq('remarks');
        await receiptsUpdatePage.save();
        expect(await receiptsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await receiptsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Receipts', async () => {
        const nbButtonsBeforeDelete = await receiptsComponentsPage.countDeleteButtons();
        await receiptsComponentsPage.clickOnLastDeleteButton();

        receiptsDeleteDialog = new ReceiptsDeleteDialog();
        expect(await receiptsDeleteDialog.getDialogTitle()).to.eq('esmsApp.receipts.delete.question');
        await receiptsDeleteDialog.clickOnConfirmButton();

        expect(await receiptsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
