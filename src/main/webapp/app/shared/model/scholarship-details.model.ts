import { Moment } from 'moment';
import { IStreet } from 'app/shared/model//street.model';
import { IPlace } from 'app/shared/model//place.model';
import { ICountry } from 'app/shared/model//country.model';
import { IScholarshipRemarks } from 'app/shared/model//scholarship-remarks.model';
import { ISupportingDocuments } from 'app/shared/model//supporting-documents.model';

export const enum ApplicationType {
    FREE = 'FREE',
    LOAN = 'LOAN'
}

export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export const enum CourseType {
    PROFESSIONAL_COURSE = 'PROFESSIONAL_COURSE',
    OTHER_COURSE = 'OTHER_COURSE'
}

export interface IScholarshipDetails {
    id?: number;
    applicationType?: ApplicationType;
    applicationDate?: Moment;
    studentName?: string;
    gender?: Gender;
    profilePictureContentType?: string;
    profilePicture?: any;
    dob?: Moment;
    doorno?: string;
    mobileNo?: string;
    landlineNo?: string;
    email?: string;
    courseType?: CourseType;
    courseName?: string;
    collegeName?: string;
    collegeAddress?: string;
    approvedAmount?: number;
    zakaathAmount?: number;
    yearsSponsored?: number;
    approvedYear?: Moment;
    scannedCopyOfApplicationContentType?: string;
    scannedCopyOfApplication?: any;
    paymentOnHold?: string;
    courseCompletedYear?: Moment;
    repaymentCompletedYear?: Moment;
    hasRepayments?: string;
    street?: IStreet;
    place?: IPlace;
    country?: ICountry;
    remarks?: IScholarshipRemarks[];
    supportingDocuments?: ISupportingDocuments[];
}

export class ScholarshipDetails implements IScholarshipDetails {
    constructor(
        public id?: number,
        public applicationType?: ApplicationType,
        public applicationDate?: Moment,
        public studentName?: string,
        public gender?: Gender,
        public profilePictureContentType?: string,
        public profilePicture?: any,
        public dob?: Moment,
        public doorno?: string,
        public mobileNo?: string,
        public landlineNo?: string,
        public email?: string,
        public courseType?: CourseType,
        public courseName?: string,
        public collegeName?: string,
        public collegeAddress?: string,
        public approvedAmount?: number,
        public zakaathAmount?: number,
        public yearsSponsored?: number,
        public approvedYear?: Moment,
        public scannedCopyOfApplicationContentType?: string,
        public scannedCopyOfApplication?: any,
        public paymentOnHold?: string,
        public courseCompletedYear?: Moment,
        public repaymentCompletedYear?: Moment,
        public hasRepayments?: string,
        public street?: IStreet,
        public place?: IPlace,
        public country?: ICountry,
        public remarks?: IScholarshipRemarks[],
        public supportingDocuments?: ISupportingDocuments[]
    ) {}
}
