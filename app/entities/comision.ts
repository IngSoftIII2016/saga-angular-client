import {Asignatura} from "./asignatura";
import {Docente} from "./docente";
import {Entity} from "./Entity";

export class Comision implements Entity {
    id: number;
    nombre: string;
    asignatura: Asignatura;
    docente: Docente[];

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }

}