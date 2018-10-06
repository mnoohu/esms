/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EsmsTestModule } from '../../../test.module';
import { ScholarshipRemarksComponent } from 'app/entities/scholarship-remarks/scholarship-remarks.component';
import { ScholarshipRemarksService } from 'app/entities/scholarship-remarks/scholarship-remarks.service';
import { ScholarshipRemarks } from 'app/shared/model/scholarship-remarks.model';

describe('Component Tests', () => {
    describe('ScholarshipRemarks Management Component', () => {
        let comp: ScholarshipRemarksComponent;
        let fixture: ComponentFixture<ScholarshipRemarksComponent>;
        let service: ScholarshipRemarksService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ScholarshipRemarksComponent],
                providers: []
            })
                .overrideTemplate(ScholarshipRemarksComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ScholarshipRemarksComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScholarshipRemarksService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ScholarshipRemarks(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.scholarshipRemarks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
