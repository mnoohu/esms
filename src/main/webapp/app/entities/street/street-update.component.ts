import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStreet } from 'app/shared/model/street.model';
import { StreetService } from './street.service';

@Component({
    selector: 'jhi-street-update',
    templateUrl: './street-update.component.html'
})
export class StreetUpdateComponent implements OnInit {
    private _street: IStreet;
    isSaving: boolean;

    constructor(private streetService: StreetService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ street }) => {
            this.street = street;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.street.id !== undefined) {
            this.subscribeToSaveResponse(this.streetService.update(this.street));
        } else {
            this.subscribeToSaveResponse(this.streetService.create(this.street));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStreet>>) {
        result.subscribe((res: HttpResponse<IStreet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get street() {
        return this._street;
    }

    set street(street: IStreet) {
        this._street = street;
    }
}
