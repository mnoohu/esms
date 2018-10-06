import { Moment } from 'moment';

export interface IPettyCash {
    id?: number;
    date?: Moment;
    details?: string;
    cashIn?: number;
    cashOut?: number;
}

export class PettyCash implements IPettyCash {
    constructor(public id?: number, public date?: Moment, public details?: string, public cashIn?: number, public cashOut?: number) {}
}
