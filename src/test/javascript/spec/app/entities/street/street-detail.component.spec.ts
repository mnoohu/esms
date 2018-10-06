/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { StreetDetailComponent } from 'app/entities/street/street-detail.component';
import { Street } from 'app/shared/model/street.model';

describe('Component Tests', () => {
    describe('Street Management Detail Component', () => {
        let comp: StreetDetailComponent;
        let fixture: ComponentFixture<StreetDetailComponent>;
        const route = ({ data: of({ street: new Street(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [StreetDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StreetDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StreetDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.street).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
