import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EsmsSharedModule } from 'app/shared';
import {
    SponsorCommitmentsComponent,
    SponsorCommitmentsDetailComponent,
    SponsorCommitmentsUpdateComponent,
    SponsorCommitmentsDeletePopupComponent,
    SponsorCommitmentsDeleteDialogComponent,
    sponsorCommitmentsRoute,
    sponsorCommitmentsPopupRoute
} from './';

const ENTITY_STATES = [...sponsorCommitmentsRoute, ...sponsorCommitmentsPopupRoute];

@NgModule({
    imports: [EsmsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SponsorCommitmentsComponent,
        SponsorCommitmentsDetailComponent,
        SponsorCommitmentsUpdateComponent,
        SponsorCommitmentsDeleteDialogComponent,
        SponsorCommitmentsDeletePopupComponent
    ],
    entryComponents: [
        SponsorCommitmentsComponent,
        SponsorCommitmentsUpdateComponent,
        SponsorCommitmentsDeleteDialogComponent,
        SponsorCommitmentsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EsmsSponsorCommitmentsModule {}
