/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { ScholarshipDetailsDetailComponent } from 'app/entities/scholarship-details/scholarship-details-detail.component';
import { ScholarshipDetails } from 'app/shared/model/scholarship-details.model';

describe('Component Tests', () => {
    describe('ScholarshipDetails Management Detail Component', () => {
        let comp: ScholarshipDetailsDetailComponent;
        let fixture: ComponentFixture<ScholarshipDetailsDetailComponent>;
        const route = ({ data: of({ scholarshipDetails: new ScholarshipDetails(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ScholarshipDetailsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ScholarshipDetailsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ScholarshipDetailsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.scholarshipDetails).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
