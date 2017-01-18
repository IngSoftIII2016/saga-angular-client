import {Entity} from "../commons/entity";
import {Accion} from "./accion";

export class Rol implements Entity {
    id: number = null;
    nombre: string;

    acciones: Accion[] = [];

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}