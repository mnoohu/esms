/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EsmsTestModule } from '../../../test.module';
import { ScholarshipDetailsDeleteDialogComponent } from 'app/entities/scholarship-details/scholarship-details-delete-dialog.component';
import { ScholarshipDetailsService } from 'app/entities/scholarship-details/scholarship-details.service';

describe('Component Tests', () => {
    describe('ScholarshipDetails Management Delete Component', () => {
        let comp: ScholarshipDetailsDeleteDialogComponent;
        let fixture: ComponentFixture<ScholarshipDetailsDeleteDialogComponent>;
        let service: ScholarshipDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ScholarshipDetailsDeleteDialogComponent]
            })
                .overrideTemplate(ScholarshipDetailsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ScholarshipDetailsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScholarshipDetailsService);
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
