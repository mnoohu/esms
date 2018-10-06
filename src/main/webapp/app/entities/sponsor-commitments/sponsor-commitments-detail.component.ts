import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISponsorCommitments } from 'app/shared/model/sponsor-commitments.model';

@Component({
    selector: 'jhi-sponsor-commitments-detail',
    templateUrl: './sponsor-commitments-detail.component.html'
})
export class SponsorCommitmentsDetailComponent implements OnInit {
    sponsorCommitments: ISponsorCommitments;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sponsorCommitments }) => {
            this.sponsorCommitments = sponsorCommitments;
        });
    }

    previousState() {
        window.history.back();
    }
}
