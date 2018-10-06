import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IScholarshipDetails } from 'app/shared/model/scholarship-details.model';

@Component({
    selector: 'jhi-scholarship-details-detail',
    templateUrl: './scholarship-details-detail.component.html'
})
export class ScholarshipDetailsDetailComponent implements OnInit {
    scholarshipDetails: IScholarshipDetails;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ scholarshipDetails }) => {
            this.scholarshipDetails = scholarshipDetails;
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
