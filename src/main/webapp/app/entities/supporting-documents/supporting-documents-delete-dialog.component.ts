import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISupportingDocuments } from 'app/shared/model/supporting-documents.model';
import { SupportingDocumentsService } from './supporting-documents.service';

@Component({
    selector: 'jhi-supporting-documents-delete-dialog',
    templateUrl: './supporting-documents-delete-dialog.component.html'
})
export class SupportingDocumentsDeleteDialogComponent {
    supportingDocuments: ISupportingDocuments;

    constructor(
        private supportingDocumentsService: SupportingDocumentsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.supportingDocumentsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'supportingDocumentsListModification',
                content: 'Deleted an supportingDocuments'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-supporting-documents-delete-popup',
    template: ''
})
export class SupportingDocumentsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ supportingDocuments }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SupportingDocumentsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.supportingDocuments = supportingDocuments;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
