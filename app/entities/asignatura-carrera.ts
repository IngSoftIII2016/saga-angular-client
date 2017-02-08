import {Entity} from "../commons/entity";
import {Asignatura} from "./asignatura";
import {Carrera} from "./carrera";
/**
 * Created by juan on 24/11/16.
 */
export class AsignaturaCarrera implements Entity {

    id: number = null;
    anio: number = 0;
    regimen: string= null;
    asignatura: Asignatura = new Asignatura();
    carrera: Carrera = new Carrera();

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}