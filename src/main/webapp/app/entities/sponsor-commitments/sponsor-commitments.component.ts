import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISponsorCommitments } from 'app/shared/model/sponsor-commitments.model';
import { Principal } from 'app/core';
import { SponsorCommitmentsService } from './sponsor-commitments.service';

@Component({
    selector: 'jhi-sponsor-commitments',
    templateUrl: './sponsor-commitments.component.html'
})
export class SponsorCommitmentsComponent implements OnInit, OnDestroy {
    sponsorCommitments: ISponsorCommitments[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sponsorCommitmentsService: SponsorCommitmentsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sponsorCommitmentsService.query().subscribe(
            (res: HttpResponse<ISponsorCommitments[]>) => {
                this.sponsorCommitments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSponsorCommitments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISponsorCommitments) {
        return item.id;
    }

    registerChangeInSponsorCommitments() {
        this.eventSubscriber = this.eventManager.subscribe('sponsorCommitmentsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
