import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPettyCash } from 'app/shared/model/petty-cash.model';

type EntityResponseType = HttpResponse<IPettyCash>;
type EntityArrayResponseType = HttpResponse<IPettyCash[]>;

@Injectable({ providedIn: 'root' })
export class PettyCashService {
    private resourceUrl = SERVER_API_URL + 'api/petty-cashes';

    constructor(private http: HttpClient) {}

    create(pettyCash: IPettyCash): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(pettyCash);
        return this.http
            .post<IPettyCash>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(pettyCash: IPettyCash): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(pettyCash);
        return this.http
            .put<IPettyCash>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPettyCash>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPettyCash[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(pettyCash: IPettyCash): IPettyCash {
        const copy: IPettyCash = Object.assign({}, pettyCash, {
            date: pettyCash.date != null && pettyCash.date.isValid() ? pettyCash.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((pettyCash: IPettyCash) => {
            pettyCash.date = pettyCash.date != null ? moment(pettyCash.date) : null;
        });
        return res;
    }
}
