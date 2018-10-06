import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IScholarshipRemarks } from 'app/shared/model/scholarship-remarks.model';

type EntityResponseType = HttpResponse<IScholarshipRemarks>;
type EntityArrayResponseType = HttpResponse<IScholarshipRemarks[]>;

@Injectable({ providedIn: 'root' })
export class ScholarshipRemarksService {
    private resourceUrl = SERVER_API_URL + 'api/scholarship-remarks';

    constructor(private http: HttpClient) {}

    create(scholarshipRemarks: IScholarshipRemarks): Observable<EntityResponseType> {
        return this.http.post<IScholarshipRemarks>(this.resourceUrl, scholarshipRemarks, { observe: 'response' });
    }

    update(scholarshipRemarks: IScholarshipRemarks): Observable<EntityResponseType> {
        return this.http.put<IScholarshipRemarks>(this.resourceUrl, scholarshipRemarks, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IScholarshipRemarks>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IScholarshipRemarks[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
