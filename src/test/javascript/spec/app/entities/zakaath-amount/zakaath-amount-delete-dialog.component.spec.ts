/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EsmsTestModule } from '../../../test.module';
import { ZakaathAmountDeleteDialogComponent } from 'app/entities/zakaath-amount/zakaath-amount-delete-dialog.component';
import { ZakaathAmountService } from 'app/entities/zakaath-amount/zakaath-amount.service';

describe('Component Tests', () => {
    describe('ZakaathAmount Management Delete Component', () => {
        let comp: ZakaathAmountDeleteDialogComponent;
        let fixture: ComponentFixture<ZakaathAmountDeleteDialogComponent>;
        let service: ZakaathAmountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ZakaathAmountDeleteDialogComponent]
            })
                .overrideTemplate(ZakaathAmountDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ZakaathAmountDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZakaathAmountService);
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
