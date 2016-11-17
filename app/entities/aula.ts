import {Edificio} from "./edificio";
import {Entity} from "./Entity";
export class Aula implements Entity {
    id: number = null;
    nombre: string;
    capacidad: number;
    ubicacion: number;
    edificio: Edificio = new Edificio();

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}