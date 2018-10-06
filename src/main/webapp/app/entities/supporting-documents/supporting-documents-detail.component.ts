import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISupportingDocuments } from 'app/shared/model/supporting-documents.model';

@Component({
    selector: 'jhi-supporting-documents-detail',
    templateUrl: './supporting-documents-detail.component.html'
})
export class SupportingDocumentsDetailComponent implements OnInit {
    supportingDocuments: ISupportingDocuments;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ supportingDocuments }) => {
            this.supportingDocuments = supportingDocuments;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
