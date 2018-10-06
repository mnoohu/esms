export interface IStreet {
    id?: number;
    name?: string;
}

export class Street implements IStreet {
    constructor(public id?: number, public name?: string) {}
}
