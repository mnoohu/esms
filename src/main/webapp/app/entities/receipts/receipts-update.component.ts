import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IReceipts } from 'app/shared/model/receipts.model';
import { ReceiptsService } from './receipts.service';

@Component({
    selector: 'jhi-receipts-update',
    templateUrl: './receipts-update.component.html'
})
export class ReceiptsUpdateComponent implements OnInit {
    private _receipts: IReceipts;
    isSaving: boolean;
    receiptDate: string;
    forYear: string;

    constructor(private receiptsService: ReceiptsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receipts }) => {
            this.receipts = receipts;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.receipts.receiptDate = moment(this.receiptDate, DATE_TIME_FORMAT);
        this.receipts.forYear = moment(this.forYear, DATE_TIME_FORMAT);
        if (this.receipts.id !== undefined) {
            this.subscribeToSaveResponse(this.receiptsService.update(this.receipts));
        } else {
            this.subscribeToSaveResponse(this.receiptsService.create(this.receipts));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReceipts>>) {
        result.subscribe((res: HttpResponse<IReceipts>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get receipts() {
        return this._receipts;
    }

    set receipts(receipts: IReceipts) {
        this._receipts = receipts;
        this.receiptDate = moment(receipts.receiptDate).format(DATE_TIME_FORMAT);
        this.forYear = moment(receipts.forYear).format(DATE_TIME_FORMAT);
    }
}
