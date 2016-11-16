import {Localidad} from "./localidad";
import {Entity} from "./Entity";
export class Edificio implements Entity{
    id: number;
    nombre: string;
    localidad: Localidad;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}