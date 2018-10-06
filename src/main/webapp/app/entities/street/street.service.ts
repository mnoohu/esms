import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStreet } from 'app/shared/model/street.model';

type EntityResponseType = HttpResponse<IStreet>;
type EntityArrayResponseType = HttpResponse<IStreet[]>;

@Injectable({ providedIn: 'root' })
export class StreetService {
    private resourceUrl = SERVER_API_URL + 'api/streets';

    constructor(private http: HttpClient) {}

    create(street: IStreet): Observable<EntityResponseType> {
        return this.http.post<IStreet>(this.resourceUrl, street, { observe: 'response' });
    }

    update(street: IStreet): Observable<EntityResponseType> {
        return this.http.put<IStreet>(this.resourceUrl, street, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStreet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStreet[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
