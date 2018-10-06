/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { ReceiptsUpdateComponent } from 'app/entities/receipts/receipts-update.component';
import { ReceiptsService } from 'app/entities/receipts/receipts.service';
import { Receipts } from 'app/shared/model/receipts.model';

describe('Component Tests', () => {
    describe('Receipts Management Update Component', () => {
        let comp: ReceiptsUpdateComponent;
        let fixture: ComponentFixture<ReceiptsUpdateComponent>;
        let service: ReceiptsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ReceiptsUpdateComponent]
            })
                .overrideTemplate(ReceiptsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceiptsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Receipts(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receipts = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Receipts();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receipts = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});