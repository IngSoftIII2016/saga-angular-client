import {Edificio} from "./edificio";
import {Entity} from "../commons/entity";

export class Aula implements Entity {
    id: number = null;
    nombre: string= null;
    capacidad: number = 0;
    ubicacion: number = 0;
    edificio: Edificio = new Edificio();

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }

    toString(): string {
        return this.nombre + ' ' + this.edificio.nombre;
    }
}