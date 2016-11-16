import {Entity} from "./Entity";
export class Docente implements Entity {
    id: number;
    nombre: string;
    apellido: string;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
