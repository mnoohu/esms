import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EsmsSharedModule } from 'app/shared';
import {
    SponsorDetailsComponent,
    SponsorDetailsDetailComponent,
    SponsorDetailsUpdateComponent,
    SponsorDetailsDeletePopupComponent,
    SponsorDetailsDeleteDialogComponent,
    sponsorDetailsRoute,
    sponsorDetailsPopupRoute
} from './';

const ENTITY_STATES = [...sponsorDetailsRoute, ...sponsorDetailsPopupRoute];

@NgModule({
    imports: [EsmsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SponsorDetailsComponent,
        SponsorDetailsDetailComponent,
        SponsorDetailsUpdateComponent,
        SponsorDetailsDeleteDialogComponent,
        SponsorDetailsDeletePopupComponent
    ],
    entryComponents: [
        SponsorDetailsComponent,
        SponsorDetailsUpdateComponent,
        SponsorDetailsDeleteDialogComponent,
        SponsorDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EsmsSponsorDetailsModule {}
