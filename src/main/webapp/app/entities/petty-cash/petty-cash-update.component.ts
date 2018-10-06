import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPettyCash } from 'app/shared/model/petty-cash.model';
import { PettyCashService } from './petty-cash.service';

@Component({
    selector: 'jhi-petty-cash-update',
    templateUrl: './petty-cash-update.component.html'
})
export class PettyCashUpdateComponent implements OnInit {
    private _pettyCash: IPettyCash;
    isSaving: boolean;
    date: string;

    constructor(private pettyCashService: PettyCashService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pettyCash }) => {
            this.pettyCash = pettyCash;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.pettyCash.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.pettyCash.id !== undefined) {
            this.subscribeToSaveResponse(this.pettyCashService.update(this.pettyCash));
        } else {
            this.subscribeToSaveResponse(this.pettyCashService.create(this.pettyCash));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPettyCash>>) {
        result.subscribe((res: HttpResponse<IPettyCash>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get pettyCash() {
        return this._pettyCash;
    }

    set pettyCash(pettyCash: IPettyCash) {
        this._pettyCash = pettyCash;
        this.date = moment(pettyCash.date).format(DATE_TIME_FORMAT);
    }
}
