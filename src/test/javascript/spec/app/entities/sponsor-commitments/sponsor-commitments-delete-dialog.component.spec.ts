/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EsmsTestModule } from '../../../test.module';
import { SponsorCommitmentsDeleteDialogComponent } from 'app/entities/sponsor-commitments/sponsor-commitments-delete-dialog.component';
import { SponsorCommitmentsService } from 'app/entities/sponsor-commitments/sponsor-commitments.service';

describe('Component Tests', () => {
    describe('SponsorCommitments Management Delete Component', () => {
        let comp: SponsorCommitmentsDeleteDialogComponent;
        let fixture: ComponentFixture<SponsorCommitmentsDeleteDialogComponent>;
        let service: SponsorCommitmentsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [SponsorCommitmentsDeleteDialogComponent]
            })
                .overrideTemplate(SponsorCommitmentsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SponsorCommitmentsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorCommitmentsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
