import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IScholarshipDetails } from 'app/shared/model/scholarship-details.model';
import { ScholarshipDetailsService } from './scholarship-details.service';
import { IStreet } from 'app/shared/model/street.model';
import { StreetService } from 'app/entities/street';
import { IPlace } from 'app/shared/model/place.model';
import { PlaceService } from 'app/entities/place';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country';

@Component({
    selector: 'jhi-scholarship-details-update',
    templateUrl: './scholarship-details-update.component.html'
})
export class ScholarshipDetailsUpdateComponent implements OnInit {
    private _scholarshipDetails: IScholarshipDetails;
    isSaving: boolean;

    streets: IStreet[];

    places: IPlace[];

    countries: ICountry[];
    applicationDate: string;
    dob: string;
    approvedYear: string;
    courseCompletedYear: string;
    repaymentCompletedYear: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private scholarshipDetailsService: ScholarshipDetailsService,
        private streetService: StreetService,
        private placeService: PlaceService,
        private countryService: CountryService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ scholarshipDetails }) => {
            this.scholarshipDetails = scholarshipDetails;
        });
        this.streetService.query({ filter: 'scholarshipdetails-is-null' }).subscribe(
            (res: HttpResponse<IStreet[]>) => {
                if (!this.scholarshipDetails.street || !this.scholarshipDetails.street.id) {
                    this.streets = res.body;
                } else {
                    this.streetService.find(this.scholarshipDetails.street.id).subscribe(
                        (subRes: HttpResponse<IStreet>) => {
                            this.streets = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.placeService.query({ filter: 'scholarshipdetails-is-null' }).subscribe(
            (res: HttpResponse<IPlace[]>) => {
                if (!this.scholarshipDetails.place || !this.scholarshipDetails.place.id) {
                    this.places = res.body;
                } else {
                    this.placeService.find(this.scholarshipDetails.place.id).subscribe(
                        (subRes: HttpResponse<IPlace>) => {
                            this.places = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.countryService.query({ filter: 'scholarshipdetails-is-null' }).subscribe(
            (res: HttpResponse<ICountry[]>) => {
                if (!this.scholarshipDetails.country || !this.scholarshipDetails.country.id) {
                    this.countries = res.body;
                } else {
                    this.countryService.find(this.scholarshipDetails.country.id).subscribe(
                        (subRes: HttpResponse<ICountry>) => {
                            this.countries = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
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
        this.dataUtils.clearInputImage(this.scholarshipDetails, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.scholarshipDetails.applicationDate = moment(this.applicationDate, DATE_TIME_FORMAT);
        this.scholarshipDetails.dob = moment(this.dob, DATE_TIME_FORMAT);
        this.scholarshipDetails.approvedYear = moment(this.approvedYear, DATE_TIME_FORMAT);
        this.scholarshipDetails.courseCompletedYear = moment(this.courseCompletedYear, DATE_TIME_FORMAT);
        this.scholarshipDetails.repaymentCompletedYear = moment(this.repaymentCompletedYear, DATE_TIME_FORMAT);
        if (this.scholarshipDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.scholarshipDetailsService.update(this.scholarshipDetails));
        } else {
            this.subscribeToSaveResponse(this.scholarshipDetailsService.create(this.scholarshipDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IScholarshipDetails>>) {
        result.subscribe((res: HttpResponse<IScholarshipDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStreetById(index: number, item: IStreet) {
        return item.id;
    }

    trackPlaceById(index: number, item: IPlace) {
        return item.id;
    }

    trackCountryById(index: number, item: ICountry) {
        return item.id;
    }
    get scholarshipDetails() {
        return this._scholarshipDetails;
    }

    set scholarshipDetails(scholarshipDetails: IScholarshipDetails) {
        this._scholarshipDetails = scholarshipDetails;
        this.applicationDate = moment(scholarshipDetails.applicationDate).format(DATE_TIME_FORMAT);
        this.dob = moment(scholarshipDetails.dob).format(DATE_TIME_FORMAT);
        this.approvedYear = moment(scholarshipDetails.approvedYear).format(DATE_TIME_FORMAT);
        this.courseCompletedYear = moment(scholarshipDetails.courseCompletedYear).format(DATE_TIME_FORMAT);
        this.repaymentCompletedYear = moment(scholarshipDetails.repaymentCompletedYear).format(DATE_TIME_FORMAT);
    }
}
