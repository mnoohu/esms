import { IStreet } from 'app/shared/model//street.model';
import { IPlace } from 'app/shared/model//place.model';
import { ICountry } from 'app/shared/model//country.model';
import { ISponsorCommitments } from 'app/shared/model//sponsor-commitments.model';

export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface ISponsorDetails {
    id?: number;
    sponsorName?: string;
    gender?: Gender;
    profilePictureContentType?: string;
    profilePicture?: any;
    doorno?: string;
    mobileNo?: string;
    landlineNo?: string;
    email?: string;
    street?: IStreet;
    place?: IPlace;
    country?: ICountry;
    commitments?: ISponsorCommitments[];
}

export class SponsorDetails implements ISponsorDetails {
    constructor(
        public id?: number,
        public sponsorName?: string,
        public gender?: Gender,
        public profilePictureContentType?: string,
        public profilePicture?: any,
        public doorno?: string,
        public mobileNo?: string,
        public landlineNo?: string,
        public email?: string,
        public street?: IStreet,
        public place?: IPlace,
        public country?: ICountry,
        public commitments?: ISponsorCommitments[]
    ) {}
}
