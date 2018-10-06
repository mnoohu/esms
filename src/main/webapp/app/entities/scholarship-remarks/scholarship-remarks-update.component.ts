import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IScholarshipRemarks } from 'app/shared/model/scholarship-remarks.model';
import { ScholarshipRemarksService } from './scholarship-remarks.service';
import { IScholarshipDetails } from 'app/shared/model/scholarship-details.model';
import { ScholarshipDetailsService } from 'app/entities/scholarship-details';

@Component({
    selector: 'jhi-scholarship-remarks-update',
    templateUrl: './scholarship-remarks-update.component.html'
})
export class ScholarshipRemarksUpdateComponent implements OnInit {
    private _scholarshipRemarks: IScholarshipRemarks;
    isSaving: boolean;

    scholarshipdetails: IScholarshipDetails[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private scholarshipRemarksService: ScholarshipRemarksService,
        private scholarshipDetailsService: ScholarshipDetailsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ scholarshipRemarks }) => {
            this.scholarshipRemarks = scholarshipRemarks;
        });
        this.scholarshipDetailsService.query().subscribe(
            (res: HttpResponse<IScholarshipDetails[]>) => {
                this.scholarshipdetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.scholarshipRemarks.id !== undefined) {
            this.subscribeToSaveResponse(this.scholarshipRemarksService.update(this.scholarshipRemarks));
        } else {
            this.subscribeToSaveResponse(this.scholarshipRemarksService.create(this.scholarshipRemarks));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IScholarshipRemarks>>) {
        result.subscribe((res: HttpResponse<IScholarshipRemarks>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackScholarshipDetailsById(index: number, item: IScholarshipDetails) {
        return item.id;
    }
    get scholarshipRemarks() {
        return this._scholarshipRemarks;
    }

    set scholarshipRemarks(scholarshipRemarks: IScholarshipRemarks) {
        this._scholarshipRemarks = scholarshipRemarks;
    }
}
