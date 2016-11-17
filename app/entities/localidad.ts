import {Entity} from "./Entity";
export class Localidad implements Entity{
    id: number = null;
    nombre: string;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}
