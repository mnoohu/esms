import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISponsorDetails } from 'app/shared/model/sponsor-details.model';

@Component({
    selector: 'jhi-sponsor-details-detail',
    templateUrl: './sponsor-details-detail.component.html'
})
export class SponsorDetailsDetailComponent implements OnInit {
    sponsorDetails: ISponsorDetails;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sponsorDetails }) => {
            this.sponsorDetails = sponsorDetails;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
