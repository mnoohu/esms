import { IScholarshipDetails } from 'app/shared/model//scholarship-details.model';

export interface IScholarshipRemarks {
    id?: number;
    remarks?: string;
    scholarshipDetails?: IScholarshipDetails;
}

export class ScholarshipRemarks implements IScholarshipRemarks {
    constructor(public id?: number, public remarks?: string, public scholarshipDetails?: IScholarshipDetails) {}
}
