import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IZakaathAmount } from 'app/shared/model/zakaath-amount.model';
import { ZakaathAmountService } from './zakaath-amount.service';

@Component({
    selector: 'jhi-zakaath-amount-update',
    templateUrl: './zakaath-amount-update.component.html'
})
export class ZakaathAmountUpdateComponent implements OnInit {
    private _zakaathAmount: IZakaathAmount;
    isSaving: boolean;

    constructor(private zakaathAmountService: ZakaathAmountService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ zakaathAmount }) => {
            this.zakaathAmount = zakaathAmount;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.zakaathAmount.id !== undefined) {
            this.subscribeToSaveResponse(this.zakaathAmountService.update(this.zakaathAmount));
        } else {
            this.subscribeToSaveResponse(this.zakaathAmountService.create(this.zakaathAmount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IZakaathAmount>>) {
        result.subscribe((res: HttpResponse<IZakaathAmount>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get zakaathAmount() {
        return this._zakaathAmount;
    }

    set zakaathAmount(zakaathAmount: IZakaathAmount) {
        this._zakaathAmount = zakaathAmount;
    }
}
