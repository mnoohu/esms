export interface IZakaathAmount {
    id?: number;
    amount?: number;
}

export class ZakaathAmount implements IZakaathAmount {
    constructor(public id?: number, public amount?: number) {}
}
