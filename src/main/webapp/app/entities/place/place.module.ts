import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EsmsSharedModule } from 'app/shared';
import {
    PlaceComponent,
    PlaceDetailComponent,
    PlaceUpdateComponent,
    PlaceDeletePopupComponent,
    PlaceDeleteDialogComponent,
    placeRoute,
    placePopupRoute
} from './';

const ENTITY_STATES = [...placeRoute, ...placePopupRoute];

@NgModule({
    imports: [EsmsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PlaceComponent, PlaceDetailComponent, PlaceUpdateComponent, PlaceDeleteDialogComponent, PlaceDeletePopupComponent],
    entryComponents: [PlaceComponent, PlaceUpdateComponent, PlaceDeleteDialogComponent, PlaceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EsmsPlaceModule {}
