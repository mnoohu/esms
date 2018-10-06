/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EsmsTestModule } from '../../../test.module';
import { SponsorDetailsDeleteDialogComponent } from 'app/entities/sponsor-details/sponsor-details-delete-dialog.component';
import { SponsorDetailsService } from 'app/entities/sponsor-details/sponsor-details.service';

describe('Component Tests', () => {
    describe('SponsorDetails Management Delete Component', () => {
        let comp: SponsorDetailsDeleteDialogComponent;
        let fixture: ComponentFixture<SponsorDetailsDeleteDialogComponent>;
        let service: SponsorDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [SponsorDetailsDeleteDialogComponent]
            })
                .overrideTemplate(SponsorDetailsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SponsorDetailsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorDetailsService);
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
