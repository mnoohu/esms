/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { SponsorDetailsUpdateComponent } from 'app/entities/sponsor-details/sponsor-details-update.component';
import { SponsorDetailsService } from 'app/entities/sponsor-details/sponsor-details.service';
import { SponsorDetails } from 'app/shared/model/sponsor-details.model';

describe('Component Tests', () => {
    describe('SponsorDetails Management Update Component', () => {
        let comp: SponsorDetailsUpdateComponent;
        let fixture: ComponentFixture<SponsorDetailsUpdateComponent>;
        let service: SponsorDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [SponsorDetailsUpdateComponent]
            })
                .overrideTemplate(SponsorDetailsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SponsorDetailsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SponsorDetailsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SponsorDetails(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sponsorDetails = entity;
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
                    const entity = new SponsorDetails();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sponsorDetails = entity;
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
