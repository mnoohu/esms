import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EsmsSharedModule } from 'app/shared';
import {
    ReceiptsComponent,
    ReceiptsDetailComponent,
    ReceiptsUpdateComponent,
    ReceiptsDeletePopupComponent,
    ReceiptsDeleteDialogComponent,
    receiptsRoute,
    receiptsPopupRoute
} from './';

const ENTITY_STATES = [...receiptsRoute, ...receiptsPopupRoute];

@NgModule({
    imports: [EsmsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReceiptsComponent,
        ReceiptsDetailComponent,
        ReceiptsUpdateComponent,
        ReceiptsDeleteDialogComponent,
        ReceiptsDeletePopupComponent
    ],
    entryComponents: [ReceiptsComponent, ReceiptsUpdateComponent, ReceiptsDeleteDialogComponent, ReceiptsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EsmsReceiptsModule {}
