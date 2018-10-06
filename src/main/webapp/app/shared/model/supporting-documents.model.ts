import { IScholarshipDetails } from 'app/shared/model//scholarship-details.model';

export interface ISupportingDocuments {
    id?: number;
    documentContentType?: string;
    document?: any;
    scholarshipDetails?: IScholarshipDetails;
}

export class SupportingDocuments implements ISupportingDocuments {
    constructor(
        public id?: number,
        public documentContentType?: string,
        public document?: any,
        public scholarshipDetails?: IScholarshipDetails
    ) {}
}
