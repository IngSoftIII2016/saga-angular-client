import {Asignatura} from "./asignatura";
import {Docente} from "./docente";
import {Entity} from "./Entity";

export class Comision implements Entity {
    id: number = null;
    nombre: string;
    asignatura: Asignatura = new Asignatura();
    docente: Docente[] = [];

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }

}