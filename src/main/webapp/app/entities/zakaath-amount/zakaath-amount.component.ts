import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IZakaathAmount } from 'app/shared/model/zakaath-amount.model';
import { Principal } from 'app/core';
import { ZakaathAmountService } from './zakaath-amount.service';

@Component({
    selector: 'jhi-zakaath-amount',
    templateUrl: './zakaath-amount.component.html'
})
export class ZakaathAmountComponent implements OnInit, OnDestroy {
    zakaathAmounts: IZakaathAmount[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private zakaathAmountService: ZakaathAmountService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.zakaathAmountService.query().subscribe(
            (res: HttpResponse<IZakaathAmount[]>) => {
                this.zakaathAmounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInZakaathAmounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IZakaathAmount) {
        return item.id;
    }

    registerChangeInZakaathAmounts() {
        this.eventSubscriber = this.eventManager.subscribe('zakaathAmountListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
