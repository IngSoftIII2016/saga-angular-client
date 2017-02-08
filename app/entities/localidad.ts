import {Entity} from "../commons/entity";
import {Sede} from "./sede";
export class Localidad implements Entity{
    id: number = null;
    nombre: string= null;
    sede: Sede = new Sede();

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}
