import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ISupportingDocuments } from 'app/shared/model/supporting-documents.model';
import { SupportingDocumentsService } from './supporting-documents.service';
import { IScholarshipDetails } from 'app/shared/model/scholarship-details.model';
import { ScholarshipDetailsService } from 'app/entities/scholarship-details';

@Component({
    selector: 'jhi-supporting-documents-update',
    templateUrl: './supporting-documents-update.component.html'
})
export class SupportingDocumentsUpdateComponent implements OnInit {
    private _supportingDocuments: ISupportingDocuments;
    isSaving: boolean;

    scholarshipdetails: IScholarshipDetails[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private supportingDocumentsService: SupportingDocumentsService,
        private scholarshipDetailsService: ScholarshipDetailsService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ supportingDocuments }) => {
            this.supportingDocuments = supportingDocuments;
        });
        this.scholarshipDetailsService.query().subscribe(
            (res: HttpResponse<IScholarshipDetails[]>) => {
                this.scholarshipdetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.supportingDocuments, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.supportingDocuments.id !== undefined) {
            this.subscribeToSaveResponse(this.supportingDocumentsService.update(this.supportingDocuments));
        } else {
            this.subscribeToSaveResponse(this.supportingDocumentsService.create(this.supportingDocuments));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISupportingDocuments>>) {
        result.subscribe((res: HttpResponse<ISupportingDocuments>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get supportingDocuments() {
        return this._supportingDocuments;
    }

    set supportingDocuments(supportingDocuments: ISupportingDocuments) {
        this._supportingDocuments = supportingDocuments;
    }
}
