import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EsmsStreetModule } from './street/street.module';
import { EsmsCountryModule } from './country/country.module';
import { EsmsPlaceModule } from './place/place.module';
import { EsmsZakaathAmountModule } from './zakaath-amount/zakaath-amount.module';
import { EsmsSupportingDocumentsModule } from './supporting-documents/supporting-documents.module';
import { EsmsScholarshipRemarksModule } from './scholarship-remarks/scholarship-remarks.module';
import { EsmsSponsorCommitmentsModule } from './sponsor-commitments/sponsor-commitments.module';
import { EsmsScholarshipDetailsModule } from './scholarship-details/scholarship-details.module';
import { EsmsSponsorDetailsModule } from './sponsor-details/sponsor-details.module';
import { EsmsReceiptsModule } from './receipts/receipts.module';
import { EsmsPettyCashModule } from './petty-cash/petty-cash.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EsmsStreetModule,
        EsmsCountryModule,
        EsmsPlaceModule,
        EsmsZakaathAmountModule,
        EsmsSupportingDocumentsModule,
        EsmsScholarshipRemarksModule,
        EsmsSponsorCommitmentsModule,
        EsmsScholarshipDetailsModule,
        EsmsSponsorDetailsModule,
        EsmsReceiptsModule,
        EsmsPettyCashModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EsmsEntityModule {}
