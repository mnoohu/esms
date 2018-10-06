/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EsmsTestModule } from '../../../test.module';
import { SupportingDocumentsComponent } from 'app/entities/supporting-documents/supporting-documents.component';
import { SupportingDocumentsService } from 'app/entities/supporting-documents/supporting-documents.service';
import { SupportingDocuments } from 'app/shared/model/supporting-documents.model';

describe('Component Tests', () => {
    describe('SupportingDocuments Management Component', () => {
        let comp: SupportingDocumentsComponent;
        let fixture: ComponentFixture<SupportingDocumentsComponent>;
        let service: SupportingDocumentsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [SupportingDocumentsComponent],
                providers: []
            })
                .overrideTemplate(SupportingDocumentsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SupportingDocumentsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupportingDocumentsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SupportingDocuments(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.supportingDocuments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
