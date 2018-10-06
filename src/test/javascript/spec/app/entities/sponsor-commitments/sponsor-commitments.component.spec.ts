/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EsmsTestModule } from '../../../test.module';
import { SponsorCommitmentsComponent } from 'app/entities/sponsor-commitments/sponsor-commitments.component';
import { SponsorCommitmentsService } from 'app/entities/sponsor-commitments/sponsor-commitments.service';
import { SponsorCommitments } from 'app/shared/model/sponsor-commitments.model';

describe('Component Tests', () => {
    describe('SponsorCommitments Management Component', () => {
        let comp: SponsorCommitmentsComponent;
        let fixture: ComponentFixture<SponsorCommitmentsComponent>;
        let service: SponsorCommitmentsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [SponsorCommitmentsComponent],
                providers: []
            })
                .overrideTemplate(SponsorCommitmentsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SponsorCommitmentsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorCommitmentsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SponsorCommitments(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sponsorCommitments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
