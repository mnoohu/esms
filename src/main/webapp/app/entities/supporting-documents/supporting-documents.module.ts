import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EsmsSharedModule } from 'app/shared';
import {
    SupportingDocumentsComponent,
    SupportingDocumentsDetailComponent,
    SupportingDocumentsUpdateComponent,
    SupportingDocumentsDeletePopupComponent,
    SupportingDocumentsDeleteDialogComponent,
    supportingDocumentsRoute,
    supportingDocumentsPopupRoute
} from './';

const ENTITY_STATES = [...supportingDocumentsRoute, ...supportingDocumentsPopupRoute];

@NgModule({
    imports: [EsmsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SupportingDocumentsComponent,
        SupportingDocumentsDetailComponent,
        SupportingDocumentsUpdateComponent,
        SupportingDocumentsDeleteDialogComponent,
        SupportingDocumentsDeletePopupComponent
    ],
    entryComponents: [
        SupportingDocumentsComponent,
        SupportingDocumentsUpdateComponent,
        SupportingDocumentsDeleteDialogComponent,
        SupportingDocumentsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EsmsSupportingDocumentsModule {}
