/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EsmsTestModule } from '../../../test.module';
import { SupportingDocumentsUpdateComponent } from 'app/entities/supporting-documents/supporting-documents-update.component';
import { SupportingDocumentsService } from 'app/entities/supporting-documents/supporting-documents.service';
import { SupportingDocuments } from 'app/shared/model/supporting-documents.model';

describe('Component Tests', () => {
    describe('SupportingDocuments Management Update Component', () => {
        let comp: SupportingDocumentsUpdateComponent;
        let fixture: ComponentFixture<SupportingDocumentsUpdateComponent>;
        let service: SupportingDocumentsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [SupportingDocumentsUpdateComponent]
            })
                .overrideTemplate(SupportingDocumentsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SupportingDocumentsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupportingDocumentsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SupportingDocuments(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.supportingDocuments = entity;
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
                    const entity = new SupportingDocuments();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.supportingDocuments = entity;
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
