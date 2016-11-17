import {Carrera} from "./carrera";
import {Entity} from "./Entity";

export class Asignatura implements Entity {
    id: number = null;
    nombre: string;
    carreras: Carrera[] = [];

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}