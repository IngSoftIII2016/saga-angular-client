import {Edificio} from "./edificio";
import {Entity} from "./Entity";
export class Aula implements Entity {
    id: number;
    nombre: string;
    capacidad: number;
    ubicacion: number;
    edificio: Edificio;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}