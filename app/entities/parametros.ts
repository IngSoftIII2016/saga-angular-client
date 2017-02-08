import {Entity} from "../commons/entity";

export class Parametro implements Entity {
    id: number = null;
    clave: string= null;
    valor: string= null;
    descripcion: string= null;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}
