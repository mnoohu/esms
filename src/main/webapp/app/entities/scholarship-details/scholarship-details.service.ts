import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IScholarshipDetails } from 'app/shared/model/scholarship-details.model';

type EntityResponseType = HttpResponse<IScholarshipDetails>;
type EntityArrayResponseType = HttpResponse<IScholarshipDetails[]>;

@Injectable({ providedIn: 'root' })
export class ScholarshipDetailsService {
    private resourceUrl = SERVER_API_URL + 'api/scholarship-details';

    constructor(private http: HttpClient) {}

    create(scholarshipDetails: IScholarshipDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(scholarshipDetails);
        return this.http
            .post<IScholarshipDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(scholarshipDetails: IScholarshipDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(scholarshipDetails);
        return this.http
            .put<IScholarshipDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IScholarshipDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IScholarshipDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(scholarshipDetails: IScholarshipDetails): IScholarshipDetails {
        const copy: IScholarshipDetails = Object.assign({}, scholarshipDetails, {
            applicationDate:
                scholarshipDetails.applicationDate != null && scholarshipDetails.applicationDate.isValid()
                    ? scholarshipDetails.applicationDate.toJSON()
                    : null,
            dob: scholarshipDetails.dob != null && scholarshipDetails.dob.isValid() ? scholarshipDetails.dob.toJSON() : null,
            approvedYear:
                scholarshipDetails.approvedYear != null && scholarshipDetails.approvedYear.isValid()
                    ? scholarshipDetails.approvedYear.toJSON()
                    : null,
            courseCompletedYear:
                scholarshipDetails.courseCompletedYear != null && scholarshipDetails.courseCompletedYear.isValid()
                    ? scholarshipDetails.courseCompletedYear.toJSON()
                    : null,
            repaymentCompletedYear:
                scholarshipDetails.repaymentCompletedYear != null && scholarshipDetails.repaymentCompletedYear.isValid()
                    ? scholarshipDetails.repaymentCompletedYear.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.applicationDate = res.body.applicationDate != null ? moment(res.body.applicationDate) : null;
        res.body.dob = res.body.dob != null ? moment(res.body.dob) : null;
        res.body.approvedYear = res.body.approvedYear != null ? moment(res.body.approvedYear) : null;
        res.body.courseCompletedYear = res.body.courseCompletedYear != null ? moment(res.body.courseCompletedYear) : null;
        res.body.repaymentCompletedYear = res.body.repaymentCompletedYear != null ? moment(res.body.repaymentCompletedYear) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((scholarshipDetails: IScholarshipDetails) => {
            scholarshipDetails.applicationDate =
                scholarshipDetails.applicationDate != null ? moment(scholarshipDetails.applicationDate) : null;
            scholarshipDetails.dob = scholarshipDetails.dob != null ? moment(scholarshipDetails.dob) : null;
            scholarshipDetails.approvedYear = scholarshipDetails.approvedYear != null ? moment(scholarshipDetails.approvedYear) : null;
            scholarshipDetails.courseCompletedYear =
                scholarshipDetails.courseCompletedYear != null ? moment(scholarshipDetails.courseCompletedYear) : null;
            scholarshipDetails.repaymentCompletedYear =
                scholarshipDetails.repaymentCompletedYear != null ? moment(scholarshipDetails.repaymentCompletedYear) : null;
        });
        return res;
    }
}
