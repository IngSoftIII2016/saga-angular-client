import {Entity} from "./Entity";
export class Localidad implements Entity{
    id: number;
    nombre: string;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}
