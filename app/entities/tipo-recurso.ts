/**
 * Created by sandro on 8/2/2017.
 */
import {Entity} from "../commons/entity";
export class TipoRecurso implements Entity {
    id : number = null;
    nombre : string;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
