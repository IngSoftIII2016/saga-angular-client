import {Entity} from "../commons/entity";
export class Docente implements Entity {
    id: number = null;
    nombre: string;
    apellido: string;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
