/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EsmsTestModule } from '../../../test.module';
import { StreetComponent } from 'app/entities/street/street.component';
import { StreetService } from 'app/entities/street/street.service';
import { Street } from 'app/shared/model/street.model';

describe('Component Tests', () => {
    describe('Street Management Component', () => {
        let comp: StreetComponent;
        let fixture: ComponentFixture<StreetComponent>;
        let service: StreetService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EsmsTestModule],
                declarations: [StreetComponent],
                providers: []
            })
                .overrideTemplate(StreetComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StreetComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StreetService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Street(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.streets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
