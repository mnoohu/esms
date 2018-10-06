/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { ZakaathAmountUpdateComponent } from 'app/entities/zakaath-amount/zakaath-amount-update.component';
import { ZakaathAmountService } from 'app/entities/zakaath-amount/zakaath-amount.service';
import { ZakaathAmount } from 'app/shared/model/zakaath-amount.model';

describe('Component Tests', () => {
    describe('ZakaathAmount Management Update Component', () => {
        let comp: ZakaathAmountUpdateComponent;
        let fixture: ComponentFixture<ZakaathAmountUpdateComponent>;
        let service: ZakaathAmountService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ZakaathAmountUpdateComponent]
            })
                .overrideTemplate(ZakaathAmountUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ZakaathAmountUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZakaathAmountService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ZakaathAmount(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.zakaathAmount = entity;
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
                    const entity = new ZakaathAmount();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.zakaathAmount = entity;
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
