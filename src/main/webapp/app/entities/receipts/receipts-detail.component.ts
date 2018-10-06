import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReceipts } from 'app/shared/model/receipts.model';

@Component({
    selector: 'jhi-receipts-detail',
    templateUrl: './receipts-detail.component.html'
})
export class ReceiptsDetailComponent implements OnInit {
    receipts: IReceipts;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receipts }) => {
            this.receipts = receipts;
        });
    }

    previousState() {
        window.history.back();
    }
}
