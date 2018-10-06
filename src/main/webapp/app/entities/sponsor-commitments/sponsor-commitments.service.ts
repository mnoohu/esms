import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISponsorCommitments } from 'app/shared/model/sponsor-commitments.model';

type EntityResponseType = HttpResponse<ISponsorCommitments>;
type EntityArrayResponseType = HttpResponse<ISponsorCommitments[]>;

@Injectable({ providedIn: 'root' })
export class SponsorCommitmentsService {
    private resourceUrl = SERVER_API_URL + 'api/sponsor-commitments';

    constructor(private http: HttpClient) {}

    create(sponsorCommitments: ISponsorCommitments): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sponsorCommitments);
        return this.http
            .post<ISponsorCommitments>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(sponsorCommitments: ISponsorCommitments): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sponsorCommitments);
        return this.http
            .put<ISponsorCommitments>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISponsorCommitments>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISponsorCommitments[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(sponsorCommitments: ISponsorCommitments): ISponsorCommitments {
        const copy: ISponsorCommitments = Object.assign({}, sponsorCommitments, {
            forYear: sponsorCommitments.forYear != null && sponsorCommitments.forYear.isValid() ? sponsorCommitments.forYear.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.forYear = res.body.forYear != null ? moment(res.body.forYear) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((sponsorCommitments: ISponsorCommitments) => {
            sponsorCommitments.forYear = sponsorCommitments.forYear != null ? moment(sponsorCommitments.forYear) : null;
        });
        return res;
    }
}
