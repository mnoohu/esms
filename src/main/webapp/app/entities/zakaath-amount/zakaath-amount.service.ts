import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IZakaathAmount } from 'app/shared/model/zakaath-amount.model';

type EntityResponseType = HttpResponse<IZakaathAmount>;
type EntityArrayResponseType = HttpResponse<IZakaathAmount[]>;

@Injectable({ providedIn: 'root' })
export class ZakaathAmountService {
    private resourceUrl = SERVER_API_URL + 'api/zakaath-amounts';

    constructor(private http: HttpClient) {}

    create(zakaathAmount: IZakaathAmount): Observable<EntityResponseType> {
        return this.http.post<IZakaathAmount>(this.resourceUrl, zakaathAmount, { observe: 'response' });
    }

    update(zakaathAmount: IZakaathAmount): Observable<EntityResponseType> {
        return this.http.put<IZakaathAmount>(this.resourceUrl, zakaathAmount, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IZakaathAmount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IZakaathAmount[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
