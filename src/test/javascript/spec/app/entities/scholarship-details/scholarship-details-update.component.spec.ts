/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { ScholarshipDetailsUpdateComponent } from 'app/entities/scholarship-details/scholarship-details-update.component';
import { ScholarshipDetailsService } from 'app/entities/scholarship-details/scholarship-details.service';
import { ScholarshipDetails } from 'app/shared/model/scholarship-details.model';

describe('Component Tests', () => {
    describe('ScholarshipDetails Management Update Component', () => {
        let comp: ScholarshipDetailsUpdateComponent;
        let fixture: ComponentFixture<ScholarshipDetailsUpdateComponent>;
        let service: ScholarshipDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ScholarshipDetailsUpdateComponent]
            })
                .overrideTemplate(ScholarshipDetailsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ScholarshipDetailsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScholarshipDetailsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ScholarshipDetails(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.scholarshipDetails = entity;
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
                    const entity = new ScholarshipDetails();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.scholarshipDetails = entity;
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
