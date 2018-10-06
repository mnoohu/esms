import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EsmsSharedModule } from 'app/shared';
import {
    ScholarshipDetailsComponent,
    ScholarshipDetailsDetailComponent,
    ScholarshipDetailsUpdateComponent,
    ScholarshipDetailsDeletePopupComponent,
    ScholarshipDetailsDeleteDialogComponent,
    scholarshipDetailsRoute,
    scholarshipDetailsPopupRoute
} from './';

const ENTITY_STATES = [...scholarshipDetailsRoute, ...scholarshipDetailsPopupRoute];

@NgModule({
    imports: [EsmsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ScholarshipDetailsComponent,
        ScholarshipDetailsDetailComponent,
        ScholarshipDetailsUpdateComponent,
        ScholarshipDetailsDeleteDialogComponent,
        ScholarshipDetailsDeletePopupComponent
    ],
    entryComponents: [
        ScholarshipDetailsComponent,
        ScholarshipDetailsUpdateComponent,
        ScholarshipDetailsDeleteDialogComponent,
        ScholarshipDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EsmsScholarshipDetailsModule {}
