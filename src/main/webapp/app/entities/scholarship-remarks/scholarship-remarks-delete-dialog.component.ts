import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IScholarshipRemarks } from 'app/shared/model/scholarship-remarks.model';
import { ScholarshipRemarksService } from './scholarship-remarks.service';

@Component({
    selector: 'jhi-scholarship-remarks-delete-dialog',
    templateUrl: './scholarship-remarks-delete-dialog.component.html'
})
export class ScholarshipRemarksDeleteDialogComponent {
    scholarshipRemarks: IScholarshipRemarks;

    constructor(
        private scholarshipRemarksService: ScholarshipRemarksService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scholarshipRemarksService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'scholarshipRemarksListModification',
                content: 'Deleted an scholarshipRemarks'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-scholarship-remarks-delete-popup',
    template: ''
})
export class ScholarshipRemarksDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ scholarshipRemarks }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ScholarshipRemarksDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.scholarshipRemarks = scholarshipRemarks;
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
