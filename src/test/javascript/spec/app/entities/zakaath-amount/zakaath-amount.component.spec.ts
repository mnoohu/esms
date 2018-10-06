/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EsmsTestModule } from '../../../test.module';
import { ZakaathAmountComponent } from 'app/entities/zakaath-amount/zakaath-amount.component';
import { ZakaathAmountService } from 'app/entities/zakaath-amount/zakaath-amount.service';
import { ZakaathAmount } from 'app/shared/model/zakaath-amount.model';

describe('Component Tests', () => {
    describe('ZakaathAmount Management Component', () => {
        let comp: ZakaathAmountComponent;
        let fixture: ComponentFixture<ZakaathAmountComponent>;
        let service: ZakaathAmountService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ZakaathAmountComponent],
                providers: []
            })
                .overrideTemplate(ZakaathAmountComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ZakaathAmountComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZakaathAmountService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ZakaathAmount(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.zakaathAmounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
