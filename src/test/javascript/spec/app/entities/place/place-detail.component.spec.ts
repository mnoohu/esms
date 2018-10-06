/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { PlaceDetailComponent } from 'app/entities/place/place-detail.component';
import { Place } from 'app/shared/model/place.model';

describe('Component Tests', () => {
    describe('Place Management Detail Component', () => {
        let comp: PlaceDetailComponent;
        let fixture: ComponentFixture<PlaceDetailComponent>;
        const route = ({ data: of({ place: new Place(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [PlaceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PlaceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlaceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.place).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
