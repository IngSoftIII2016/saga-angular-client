import {Asignatura} from "./asignatura";
import {Periodo} from "./periodo"
import {Entity} from "./entity";

export class Comision implements Entity {
    id: number = null;
    nombre: string;
    asignatura: Asignatura = new Asignatura();
    periodo: Periodo = new Periodo();

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }

}