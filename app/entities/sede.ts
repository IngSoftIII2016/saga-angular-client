import {Entity} from "../commons/entity";
export class Sede implements Entity {
    id : number = null;
    nombre : string= null;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
