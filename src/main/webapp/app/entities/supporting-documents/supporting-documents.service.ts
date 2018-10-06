import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISupportingDocuments } from 'app/shared/model/supporting-documents.model';

type EntityResponseType = HttpResponse<ISupportingDocuments>;
type EntityArrayResponseType = HttpResponse<ISupportingDocuments[]>;

@Injectable({ providedIn: 'root' })
export class SupportingDocumentsService {
    private resourceUrl = SERVER_API_URL + 'api/supporting-documents';

    constructor(private http: HttpClient) {}

    create(supportingDocuments: ISupportingDocuments): Observable<EntityResponseType> {
        return this.http.post<ISupportingDocuments>(this.resourceUrl, supportingDocuments, { observe: 'response' });
    }

    update(supportingDocuments: ISupportingDocuments): Observable<EntityResponseType> {
        return this.http.put<ISupportingDocuments>(this.resourceUrl, supportingDocuments, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISupportingDocuments>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISupportingDocuments[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
