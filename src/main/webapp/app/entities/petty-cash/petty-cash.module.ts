import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EsmsSharedModule } from 'app/shared';
import {
    PettyCashComponent,
    PettyCashDetailComponent,
    PettyCashUpdateComponent,
    PettyCashDeletePopupComponent,
    PettyCashDeleteDialogComponent,
    pettyCashRoute,
    pettyCashPopupRoute
} from './';

const ENTITY_STATES = [...pettyCashRoute, ...pettyCashPopupRoute];

@NgModule({
    imports: [EsmsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PettyCashComponent,
        PettyCashDetailComponent,
        PettyCashUpdateComponent,
        PettyCashDeleteDialogComponent,
        PettyCashDeletePopupComponent
    ],
    entryComponents: [PettyCashComponent, PettyCashUpdateComponent, PettyCashDeleteDialogComponent, PettyCashDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EsmsPettyCashModule {}
