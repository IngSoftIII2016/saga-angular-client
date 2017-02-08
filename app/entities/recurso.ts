/**
 * Created by sandro on 8/2/2017.
 */
import {Entity} from "../commons/entity";
import {Aula} from "./aula";
import {TipoRecurso} from "./tipo-recurso";

export class Recurso implements Entity {
    id : number = null;
    tipo_recurso : TipoRecurso = new TipoRecurso();
    aula : Aula = new Aula();
    disponible : boolean;
    detalles : string;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
