import {Entity} from "../commons/entity";
export class Carrera implements Entity{
    id: number = null;
    nombre: string= null;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}