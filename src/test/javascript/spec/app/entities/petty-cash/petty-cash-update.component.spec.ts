/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { PettyCashUpdateComponent } from 'app/entities/petty-cash/petty-cash-update.component';
import { PettyCashService } from 'app/entities/petty-cash/petty-cash.service';
import { PettyCash } from 'app/shared/model/petty-cash.model';

describe('Component Tests', () => {
    describe('PettyCash Management Update Component', () => {
        let comp: PettyCashUpdateComponent;
        let fixture: ComponentFixture<PettyCashUpdateComponent>;
        let service: PettyCashService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [PettyCashUpdateComponent]
            })
                .overrideTemplate(PettyCashUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PettyCashUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PettyCashService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PettyCash(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pettyCash = entity;
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
                    const entity = new PettyCash();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pettyCash = entity;
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
