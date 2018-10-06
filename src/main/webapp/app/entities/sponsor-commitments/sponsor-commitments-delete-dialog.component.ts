import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISponsorCommitments } from 'app/shared/model/sponsor-commitments.model';
import { SponsorCommitmentsService } from './sponsor-commitments.service';

@Component({
    selector: 'jhi-sponsor-commitments-delete-dialog',
    templateUrl: './sponsor-commitments-delete-dialog.component.html'
})
export class SponsorCommitmentsDeleteDialogComponent {
    sponsorCommitments: ISponsorCommitments;

    constructor(
        private sponsorCommitmentsService: SponsorCommitmentsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sponsorCommitmentsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sponsorCommitmentsListModification',
                content: 'Deleted an sponsorCommitments'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sponsor-commitments-delete-popup',
    template: ''
})
export class SponsorCommitmentsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sponsorCommitments }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SponsorCommitmentsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sponsorCommitments = sponsorCommitments;
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
