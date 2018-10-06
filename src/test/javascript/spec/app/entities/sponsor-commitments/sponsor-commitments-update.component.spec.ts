/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { SponsorCommitmentsUpdateComponent } from 'app/entities/sponsor-commitments/sponsor-commitments-update.component';
import { SponsorCommitmentsService } from 'app/entities/sponsor-commitments/sponsor-commitments.service';
import { SponsorCommitments } from 'app/shared/model/sponsor-commitments.model';

describe('Component Tests', () => {
    describe('SponsorCommitments Management Update Component', () => {
        let comp: SponsorCommitmentsUpdateComponent;
        let fixture: ComponentFixture<SponsorCommitmentsUpdateComponent>;
        let service: SponsorCommitmentsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [SponsorCommitmentsUpdateComponent]
            })
                .overrideTemplate(SponsorCommitmentsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SponsorCommitmentsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorCommitmentsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SponsorCommitments(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sponsorCommitments = entity;
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
                    const entity = new SponsorCommitments();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sponsorCommitments = entity;
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
