import {Entity} from "./Entity";
import {Sede} from "./sede";
export class Localidad implements Entity{
    id: number = null;
    nombre: string;
    sede: Sede = new Sede();

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}
