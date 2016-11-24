import {Entity} from "./entity";
import {Asignatura} from "./asignatura";
import {Carrera} from "./carrera";
/**
 * Created by juan on 24/11/16.
 */
export class AsignaturaCarrera implements Entity {

    id: number;
    anio: number;
    regimen: string;
    asignatura: Asignatura;
    carrera: Carrera;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}