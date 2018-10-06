import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReceipts } from 'app/shared/model/receipts.model';

type EntityResponseType = HttpResponse<IReceipts>;
type EntityArrayResponseType = HttpResponse<IReceipts[]>;

@Injectable({ providedIn: 'root' })
export class ReceiptsService {
    private resourceUrl = SERVER_API_URL + 'api/receipts';

    constructor(private http: HttpClient) {}

    create(receipts: IReceipts): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(receipts);
        return this.http
            .post<IReceipts>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(receipts: IReceipts): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(receipts);
        return this.http
            .put<IReceipts>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReceipts>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReceipts[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(receipts: IReceipts): IReceipts {
        const copy: IReceipts = Object.assign({}, receipts, {
            receiptDate: receipts.receiptDate != null && receipts.receiptDate.isValid() ? receipts.receiptDate.toJSON() : null,
            forYear: receipts.forYear != null && receipts.forYear.isValid() ? receipts.forYear.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.receiptDate = res.body.receiptDate != null ? moment(res.body.receiptDate) : null;
        res.body.forYear = res.body.forYear != null ? moment(res.body.forYear) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((receipts: IReceipts) => {
            receipts.receiptDate = receipts.receiptDate != null ? moment(receipts.receiptDate) : null;
            receipts.forYear = receipts.forYear != null ? moment(receipts.forYear) : null;
        });
        return res;
    }
}
