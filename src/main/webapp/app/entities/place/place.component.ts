import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlace } from 'app/shared/model/place.model';
import { Principal } from 'app/core';
import { PlaceService } from './place.service';

@Component({
    selector: 'jhi-place',
    templateUrl: './place.component.html'
})
export class PlaceComponent implements OnInit, OnDestroy {
    places: IPlace[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private placeService: PlaceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.placeService.query().subscribe(
            (res: HttpResponse<IPlace[]>) => {
                this.places = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPlaces();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPlace) {
        return item.id;
    }

    registerChangeInPlaces() {
        this.eventSubscriber = this.eventManager.subscribe('placeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
