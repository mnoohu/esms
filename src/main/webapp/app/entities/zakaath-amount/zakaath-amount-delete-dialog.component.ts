import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IZakaathAmount } from 'app/shared/model/zakaath-amount.model';
import { ZakaathAmountService } from './zakaath-amount.service';

@Component({
    selector: 'jhi-zakaath-amount-delete-dialog',
    templateUrl: './zakaath-amount-delete-dialog.component.html'
})
export class ZakaathAmountDeleteDialogComponent {
    zakaathAmount: IZakaathAmount;

    constructor(
        private zakaathAmountService: ZakaathAmountService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.zakaathAmountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'zakaathAmountListModification',
                content: 'Deleted an zakaathAmount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-zakaath-amount-delete-popup',
    template: ''
})
export class ZakaathAmountDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ zakaathAmount }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ZakaathAmountDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.zakaathAmount = zakaathAmount;
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
