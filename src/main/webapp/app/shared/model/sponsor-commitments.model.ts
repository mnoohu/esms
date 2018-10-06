import { Moment } from 'moment';
import { ISponsorDetails } from 'app/shared/model//sponsor-details.model';

export interface ISponsorCommitments {
    id?: number;
    forYear?: Moment;
    amount?: number;
    paid?: string;
    reciptNo?: number;
    sponsorDetails?: ISponsorDetails;
}

export class SponsorCommitments implements ISponsorCommitments {
    constructor(
        public id?: number,
        public forYear?: Moment,
        public amount?: number,
        public paid?: string,
        public reciptNo?: number,
        public sponsorDetails?: ISponsorDetails
    ) {}
}
