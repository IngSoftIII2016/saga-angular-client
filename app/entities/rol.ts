import {Entity} from "../commons/entity";

export class Rol implements Entity {
    id: number = null;
    nombre: string;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}