import {Entity} from "../commons/entity";

export class Accion implements Entity {

    id: number = null;
    url: string = '';
    metodo: string = 'GET';
    recurso: string = '';

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}