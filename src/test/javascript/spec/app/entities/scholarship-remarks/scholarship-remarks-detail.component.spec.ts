/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { ScholarshipRemarksDetailComponent } from 'app/entities/scholarship-remarks/scholarship-remarks-detail.component';
import { ScholarshipRemarks } from 'app/shared/model/scholarship-remarks.model';

describe('Component Tests', () => {
    describe('ScholarshipRemarks Management Detail Component', () => {
        let comp: ScholarshipRemarksDetailComponent;
        let fixture: ComponentFixture<ScholarshipRemarksDetailComponent>;
        const route = ({ data: of({ scholarshipRemarks: new ScholarshipRemarks(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ScholarshipRemarksDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ScholarshipRemarksDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ScholarshipRemarksDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.scholarshipRemarks).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
