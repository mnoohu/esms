import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EsmsSharedModule } from 'app/shared';
import {
    ScholarshipRemarksComponent,
    ScholarshipRemarksDetailComponent,
    ScholarshipRemarksUpdateComponent,
    ScholarshipRemarksDeletePopupComponent,
    ScholarshipRemarksDeleteDialogComponent,
    scholarshipRemarksRoute,
    scholarshipRemarksPopupRoute
} from './';

const ENTITY_STATES = [...scholarshipRemarksRoute, ...scholarshipRemarksPopupRoute];

@NgModule({
    imports: [EsmsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ScholarshipRemarksComponent,
        ScholarshipRemarksDetailComponent,
        ScholarshipRemarksUpdateComponent,
        ScholarshipRemarksDeleteDialogComponent,
        ScholarshipRemarksDeletePopupComponent
    ],
    entryComponents: [
        ScholarshipRemarksComponent,
        ScholarshipRemarksUpdateComponent,
        ScholarshipRemarksDeleteDialogComponent,
        ScholarshipRemarksDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EsmsScholarshipRemarksModule {}
