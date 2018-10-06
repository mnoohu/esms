/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EsmsTestModule } from '../../../test.module';
import { ReceiptsDeleteDialogComponent } from 'app/entities/receipts/receipts-delete-dialog.component';
import { ReceiptsService } from 'app/entities/receipts/receipts.service';

describe('Component Tests', () => {
    describe('Receipts Management Delete Component', () => {
        let comp: ReceiptsDeleteDialogComponent;
        let fixture: ComponentFixture<ReceiptsDeleteDialogComponent>;
        let service: ReceiptsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ReceiptsDeleteDialogComponent]
            })
                .overrideTemplate(ReceiptsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiptsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptsService);
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
