import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPettyCash } from 'app/shared/model/petty-cash.model';
import { PettyCashService } from './petty-cash.service';

@Component({
    selector: 'jhi-petty-cash-delete-dialog',
    templateUrl: './petty-cash-delete-dialog.component.html'
})
export class PettyCashDeleteDialogComponent {
    pettyCash: IPettyCash;

    constructor(private pettyCashService: PettyCashService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pettyCashService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pettyCashListModification',
                content: 'Deleted an pettyCash'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-petty-cash-delete-popup',
    template: ''
})
export class PettyCashDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pettyCash }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PettyCashDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.pettyCash = pettyCash;
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
