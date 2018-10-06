import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IScholarshipRemarks } from 'app/shared/model/scholarship-remarks.model';

@Component({
    selector: 'jhi-scholarship-remarks-detail',
    templateUrl: './scholarship-remarks-detail.component.html'
})
export class ScholarshipRemarksDetailComponent implements OnInit {
    scholarshipRemarks: IScholarshipRemarks;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ scholarshipRemarks }) => {
            this.scholarshipRemarks = scholarshipRemarks;
        });
    }

    previousState() {
        window.history.back();
    }
}
