/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { ScholarshipRemarksUpdateComponent } from 'app/entities/scholarship-remarks/scholarship-remarks-update.component';
import { ScholarshipRemarksService } from 'app/entities/scholarship-remarks/scholarship-remarks.service';
import { ScholarshipRemarks } from 'app/shared/model/scholarship-remarks.model';

describe('Component Tests', () => {
    describe('ScholarshipRemarks Management Update Component', () => {
        let comp: ScholarshipRemarksUpdateComponent;
        let fixture: ComponentFixture<ScholarshipRemarksUpdateComponent>;
        let service: ScholarshipRemarksService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ScholarshipRemarksUpdateComponent]
            })
                .overrideTemplate(ScholarshipRemarksUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ScholarshipRemarksUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScholarshipRemarksService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ScholarshipRemarks(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.scholarshipRemarks = entity;
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
                    const entity = new ScholarshipRemarks();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.scholarshipRemarks = entity;
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
