/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { PettyCashDetailComponent } from 'app/entities/petty-cash/petty-cash-detail.component';
import { PettyCash } from 'app/shared/model/petty-cash.model';

describe('Component Tests', () => {
    describe('PettyCash Management Detail Component', () => {
        let comp: PettyCashDetailComponent;
        let fixture: ComponentFixture<PettyCashDetailComponent>;
        const route = ({ data: of({ pettyCash: new PettyCash(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [PettyCashDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PettyCashDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PettyCashDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pettyCash).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
