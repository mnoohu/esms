import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EsmsSharedModule } from 'app/shared';
import {
    ZakaathAmountComponent,
    ZakaathAmountDetailComponent,
    ZakaathAmountUpdateComponent,
    ZakaathAmountDeletePopupComponent,
    ZakaathAmountDeleteDialogComponent,
    zakaathAmountRoute,
    zakaathAmountPopupRoute
} from './';

const ENTITY_STATES = [...zakaathAmountRoute, ...zakaathAmountPopupRoute];

@NgModule({
    imports: [EsmsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ZakaathAmountComponent,
        ZakaathAmountDetailComponent,
        ZakaathAmountUpdateComponent,
        ZakaathAmountDeleteDialogComponent,
        ZakaathAmountDeletePopupComponent
    ],
    entryComponents: [
        ZakaathAmountComponent,
        ZakaathAmountUpdateComponent,
        ZakaathAmountDeleteDialogComponent,
        ZakaathAmountDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EsmsZakaathAmountModule {}
