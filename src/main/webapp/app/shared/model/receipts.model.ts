import { Moment } from 'moment';

export const enum ReceiptType {
    DONATION = 'DONATION',
    SUBSCRIPTION = 'SUBSCRIPTION',
    SCHOLARSHIP = 'SCHOLARSHIP',
    REPAYMENT = 'REPAYMENT',
    ZAKAATH = 'ZAKAATH'
}

export interface IReceipts {
    id?: number;
    receiptDate?: Moment;
    receiptType?: ReceiptType;
    name?: string;
    amount?: number;
    forYear?: Moment;
    remarks?: string;
}

export class Receipts implements IReceipts {
    constructor(
        public id?: number,
        public receiptDate?: Moment,
        public receiptType?: ReceiptType,
        public name?: string,
        public amount?: number,
        public forYear?: Moment,
        public remarks?: string
    ) {}
}
