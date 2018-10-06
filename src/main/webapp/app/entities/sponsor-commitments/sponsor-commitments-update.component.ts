import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ISponsorCommitments } from 'app/shared/model/sponsor-commitments.model';
import { SponsorCommitmentsService } from './sponsor-commitments.service';
import { ISponsorDetails } from 'app/shared/model/sponsor-details.model';
import { SponsorDetailsService } from 'app/entities/sponsor-details';

@Component({
    selector: 'jhi-sponsor-commitments-update',
    templateUrl: './sponsor-commitments-update.component.html'
})
export class SponsorCommitmentsUpdateComponent implements OnInit {
    private _sponsorCommitments: ISponsorCommitments;
    isSaving: boolean;

    sponsordetails: ISponsorDetails[];
    forYear: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private sponsorCommitmentsService: SponsorCommitmentsService,
        private sponsorDetailsService: SponsorDetailsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sponsorCommitments }) => {
            this.sponsorCommitments = sponsorCommitments;
        });
        this.sponsorDetailsService.query().subscribe(
            (res: HttpResponse<ISponsorDetails[]>) => {
                this.sponsordetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.sponsorCommitments.forYear = moment(this.forYear, DATE_TIME_FORMAT);
        if (this.sponsorCommitments.id !== undefined) {
            this.subscribeToSaveResponse(this.sponsorCommitmentsService.update(this.sponsorCommitments));
        } else {
            this.subscribeToSaveResponse(this.sponsorCommitmentsService.create(this.sponsorCommitments));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISponsorCommitments>>) {
        result.subscribe((res: HttpResponse<ISponsorCommitments>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSponsorDetailsById(index: number, item: ISponsorDetails) {
        return item.id;
    }
    get sponsorCommitments() {
        return this._sponsorCommitments;
    }

    set sponsorCommitments(sponsorCommitments: ISponsorCommitments) {
        this._sponsorCommitments = sponsorCommitments;
        this.forYear = moment(sponsorCommitments.forYear).format(DATE_TIME_FORMAT);
    }
}
