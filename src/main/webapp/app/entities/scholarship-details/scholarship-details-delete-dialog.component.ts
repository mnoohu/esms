import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IScholarshipDetails } from 'app/shared/model/scholarship-details.model';
import { ScholarshipDetailsService } from './scholarship-details.service';

@Component({
    selector: 'jhi-scholarship-details-delete-dialog',
    templateUrl: './scholarship-details-delete-dialog.component.html'
})
export class ScholarshipDetailsDeleteDialogComponent {
    scholarshipDetails: IScholarshipDetails;

    constructor(
        private scholarshipDetailsService: ScholarshipDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scholarshipDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'scholarshipDetailsListModification',
                content: 'Deleted an scholarshipDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-scholarship-details-delete-popup',
    template: ''
})
export class ScholarshipDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ scholarshipDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ScholarshipDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.scholarshipDetails = scholarshipDetails;
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
