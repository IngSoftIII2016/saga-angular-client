import {Entity} from "./Entity";
export class Docente implements Entity {
    id: number = null;
    nombre: string;
    apellido: string;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
