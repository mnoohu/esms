export interface IPlace {
    id?: number;
    name?: string;
}

export class Place implements IPlace {
    constructor(public id?: number, public name?: string) {}
}
