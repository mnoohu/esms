import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IScholarshipRemarks } from 'app/shared/model/scholarship-remarks.model';
import { Principal } from 'app/core';
import { ScholarshipRemarksService } from './scholarship-remarks.service';

@Component({
    selector: 'jhi-scholarship-remarks',
    templateUrl: './scholarship-remarks.component.html'
})
export class ScholarshipRemarksComponent implements OnInit, OnDestroy {
    scholarshipRemarks: IScholarshipRemarks[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private scholarshipRemarksService: ScholarshipRemarksService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.scholarshipRemarksService.query().subscribe(
            (res: HttpResponse<IScholarshipRemarks[]>) => {
                this.scholarshipRemarks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInScholarshipRemarks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IScholarshipRemarks) {
        return item.id;
    }

    registerChangeInScholarshipRemarks() {
        this.eventSubscriber = this.eventManager.subscribe('scholarshipRemarksListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
