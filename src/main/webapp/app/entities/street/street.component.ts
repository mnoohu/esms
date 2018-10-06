import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStreet } from 'app/shared/model/street.model';
import { Principal } from 'app/core';
import { StreetService } from './street.service';

@Component({
    selector: 'jhi-street',
    templateUrl: './street.component.html'
})
export class StreetComponent implements OnInit, OnDestroy {
    streets: IStreet[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private streetService: StreetService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.streetService.query().subscribe(
            (res: HttpResponse<IStreet[]>) => {
                this.streets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStreets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStreet) {
        return item.id;
    }

    registerChangeInStreets() {
        this.eventSubscriber = this.eventManager.subscribe('streetListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
