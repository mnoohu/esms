import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ISponsorDetails } from 'app/shared/model/sponsor-details.model';
import { SponsorDetailsService } from './sponsor-details.service';
import { IStreet } from 'app/shared/model/street.model';
import { StreetService } from 'app/entities/street';
import { IPlace } from 'app/shared/model/place.model';
import { PlaceService } from 'app/entities/place';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country';

@Component({
    selector: 'jhi-sponsor-details-update',
    templateUrl: './sponsor-details-update.component.html'
})
export class SponsorDetailsUpdateComponent implements OnInit {
    private _sponsorDetails: ISponsorDetails;
    isSaving: boolean;

    streets: IStreet[];

    places: IPlace[];

    countries: ICountry[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private sponsorDetailsService: SponsorDetailsService,
        private streetService: StreetService,
        private placeService: PlaceService,
        private countryService: CountryService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sponsorDetails }) => {
            this.sponsorDetails = sponsorDetails;
        });
        this.streetService.query({ filter: 'sponsordetails-is-null' }).subscribe(
            (res: HttpResponse<IStreet[]>) => {
                if (!this.sponsorDetails.street || !this.sponsorDetails.street.id) {
                    this.streets = res.body;
                } else {
                    this.streetService.find(this.sponsorDetails.street.id).subscribe(
                        (subRes: HttpResponse<IStreet>) => {
                            this.streets = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.placeService.query({ filter: 'sponsordetails-is-null' }).subscribe(
            (res: HttpResponse<IPlace[]>) => {
                if (!this.sponsorDetails.place || !this.sponsorDetails.place.id) {
                    this.places = res.body;
                } else {
                    this.placeService.find(this.sponsorDetails.place.id).subscribe(
                        (subRes: HttpResponse<IPlace>) => {
                            this.places = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.countryService.query({ filter: 'sponsordetails-is-null' }).subscribe(
            (res: HttpResponse<ICountry[]>) => {
                if (!this.sponsorDetails.country || !this.sponsorDetails.country.id) {
                    this.countries = res.body;
                } else {
                    this.countryService.find(this.sponsorDetails.country.id).subscribe(
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
        this.dataUtils.clearInputImage(this.sponsorDetails, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sponsorDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.sponsorDetailsService.update(this.sponsorDetails));
        } else {
            this.subscribeToSaveResponse(this.sponsorDetailsService.create(this.sponsorDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISponsorDetails>>) {
        result.subscribe((res: HttpResponse<ISponsorDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get sponsorDetails() {
        return this._sponsorDetails;
    }

    set sponsorDetails(sponsorDetails: ISponsorDetails) {
        this._sponsorDetails = sponsorDetails;
    }
}
