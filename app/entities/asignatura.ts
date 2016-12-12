import {Carrera} from "./carrera";
import {Entity} from "../commons/entity";

export class Asignatura implements Entity {
    id: number = null;
    nombre: string;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}