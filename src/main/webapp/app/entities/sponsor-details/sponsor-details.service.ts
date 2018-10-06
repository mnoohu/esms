import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISponsorDetails } from 'app/shared/model/sponsor-details.model';

type EntityResponseType = HttpResponse<ISponsorDetails>;
type EntityArrayResponseType = HttpResponse<ISponsorDetails[]>;

@Injectable({ providedIn: 'root' })
export class SponsorDetailsService {
    private resourceUrl = SERVER_API_URL + 'api/sponsor-details';

    constructor(private http: HttpClient) {}

    create(sponsorDetails: ISponsorDetails): Observable<EntityResponseType> {
        return this.http.post<ISponsorDetails>(this.resourceUrl, sponsorDetails, { observe: 'response' });
    }

    update(sponsorDetails: ISponsorDetails): Observable<EntityResponseType> {
        return this.http.put<ISponsorDetails>(this.resourceUrl, sponsorDetails, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISponsorDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISponsorDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
