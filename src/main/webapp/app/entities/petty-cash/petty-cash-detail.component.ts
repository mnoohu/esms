import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPettyCash } from 'app/shared/model/petty-cash.model';

@Component({
    selector: 'jhi-petty-cash-detail',
    templateUrl: './petty-cash-detail.component.html'
})
export class PettyCashDetailComponent implements OnInit {
    pettyCash: IPettyCash;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pettyCash }) => {
            this.pettyCash = pettyCash;
        });
    }

    previousState() {
        window.history.back();
    }
}
