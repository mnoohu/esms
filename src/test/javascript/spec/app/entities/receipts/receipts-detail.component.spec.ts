/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { ReceiptsDetailComponent } from 'app/entities/receipts/receipts-detail.component';
import { Receipts } from 'app/shared/model/receipts.model';

describe('Component Tests', () => {
    describe('Receipts Management Detail Component', () => {
        let comp: ReceiptsDetailComponent;
        let fixture: ComponentFixture<ReceiptsDetailComponent>;
        const route = ({ data: of({ receipts: new Receipts(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [ReceiptsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReceiptsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiptsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.receipts).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
