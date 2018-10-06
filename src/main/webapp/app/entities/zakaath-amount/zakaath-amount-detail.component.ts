import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IZakaathAmount } from 'app/shared/model/zakaath-amount.model';

@Component({
    selector: 'jhi-zakaath-amount-detail',
    templateUrl: './zakaath-amount-detail.component.html'
})
export class ZakaathAmountDetailComponent implements OnInit {
    zakaathAmount: IZakaathAmount;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ zakaathAmount }) => {
            this.zakaathAmount = zakaathAmount;
        });
    }

    previousState() {
        window.history.back();
    }
}
