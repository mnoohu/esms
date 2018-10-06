/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EsmsTestModule } from '../../../test.module';
import { SupportingDocumentsDeleteDialogComponent } from 'app/entities/supporting-documents/supporting-documents-delete-dialog.component';
import { SupportingDocumentsService } from 'app/entities/supporting-documents/supporting-documents.service';

describe('Component Tests', () => {
    describe('SupportingDocuments Management Delete Component', () => {
        let comp: SupportingDocumentsDeleteDialogComponent;
        let fixture: ComponentFixture<SupportingDocumentsDeleteDialogComponent>;
        let service: SupportingDocumentsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [SupportingDocumentsDeleteDialogComponent]
            })
                .overrideTemplate(SupportingDocumentsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SupportingDocumentsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupportingDocumentsService);
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
