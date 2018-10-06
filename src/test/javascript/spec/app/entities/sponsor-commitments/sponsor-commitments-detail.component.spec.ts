/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { SponsorCommitmentsDetailComponent } from 'app/entities/sponsor-commitments/sponsor-commitments-detail.component';
import { SponsorCommitments } from 'app/shared/model/sponsor-commitments.model';

describe('Component Tests', () => {
    describe('SponsorCommitments Management Detail Component', () => {
        let comp: SponsorCommitmentsDetailComponent;
        let fixture: ComponentFixture<SponsorCommitmentsDetailComponent>;
        const route = ({ data: of({ sponsorCommitments: new SponsorCommitments(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [SponsorCommitmentsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SponsorCommitmentsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SponsorCommitmentsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sponsorCommitments).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
