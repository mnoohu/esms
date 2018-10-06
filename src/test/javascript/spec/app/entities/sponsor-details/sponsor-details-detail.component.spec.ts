/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { SponsorDetailsDetailComponent } from 'app/entities/sponsor-details/sponsor-details-detail.component';
import { SponsorDetails } from 'app/shared/model/sponsor-details.model';

describe('Component Tests', () => {
    describe('SponsorDetails Management Detail Component', () => {
        let comp: SponsorDetailsDetailComponent;
        let fixture: ComponentFixture<SponsorDetailsDetailComponent>;
        const route = ({ data: of({ sponsorDetails: new SponsorDetails(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [SponsorDetailsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SponsorDetailsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SponsorDetailsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sponsorDetails).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
