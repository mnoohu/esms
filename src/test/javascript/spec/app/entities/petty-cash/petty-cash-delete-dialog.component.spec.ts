/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EsmsTestModule } from '../../../test.module';
import { PettyCashDeleteDialogComponent } from 'app/entities/petty-cash/petty-cash-delete-dialog.component';
import { PettyCashService } from 'app/entities/petty-cash/petty-cash.service';

describe('Component Tests', () => {
    describe('PettyCash Management Delete Component', () => {
        let comp: PettyCashDeleteDialogComponent;
        let fixture: ComponentFixture<PettyCashDeleteDialogComponent>;
        let service: PettyCashService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [PettyCashDeleteDialogComponent]
            })
                .overrideTemplate(PettyCashDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PettyCashDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PettyCashService);
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
