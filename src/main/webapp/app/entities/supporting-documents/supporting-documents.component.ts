import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ISupportingDocuments } from 'app/shared/model/supporting-documents.model';
import { Principal } from 'app/core';
import { SupportingDocumentsService } from './supporting-documents.service';

@Component({
    selector: 'jhi-supporting-documents',
    templateUrl: './supporting-documents.component.html'
})
export class SupportingDocumentsComponent implements OnInit, OnDestroy {
    supportingDocuments: ISupportingDocuments[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private supportingDocumentsService: SupportingDocumentsService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.supportingDocumentsService.query().subscribe(
            (res: HttpResponse<ISupportingDocuments[]>) => {
                this.supportingDocuments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSupportingDocuments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISupportingDocuments) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInSupportingDocuments() {
        this.eventSubscriber = this.eventManager.subscribe('supportingDocumentsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
