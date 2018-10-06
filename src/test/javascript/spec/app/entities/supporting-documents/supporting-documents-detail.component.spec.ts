/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { SupportingDocumentsDetailComponent } from 'app/entities/supporting-documents/supporting-documents-detail.component';
import { SupportingDocuments } from 'app/shared/model/supporting-documents.model';

describe('Component Tests', () => {
    describe('SupportingDocuments Management Detail Component', () => {
        let comp: SupportingDocumentsDetailComponent;
        let fixture: ComponentFixture<SupportingDocumentsDetailComponent>;
        const route = ({ data: of({ supportingDocuments: new SupportingDocuments(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [SupportingDocumentsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SupportingDocumentsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SupportingDocumentsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.supportingDocuments).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
