/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { ZakaathAmountDetailComponent } from 'app/entities/zakaath-amount/zakaath-amount-detail.component';
import { ZakaathAmount } from 'app/shared/model/zakaath-amount.model';

describe('Component Tests', () => {
    describe('ZakaathAmount Management Detail Component', () => {
        let comp: ZakaathAmountDetailComponent;
        let fixture: ComponentFixture<ZakaathAmountDetailComponent>;
        const route = ({ data: of({ zakaathAmount: new ZakaathAmount(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ZakaathAmountDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ZakaathAmountDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ZakaathAmountDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.zakaathAmount).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
