import {Asignatura} from "./asignatura";
import {Periodo} from "./periodo"
import {Entity} from "../commons/entity";
import {Docente} from "./docente";

export class Comision implements Entity {
    id: number = null;
    nombre: string = '';
    asignatura: Asignatura = new Asignatura();
    periodo: Periodo = new Periodo();
    docente: Docente = new Docente();

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }

    public toString() {
        return this.asignatura.nombre + ' ' + this.nombre;
    }

    public toFullString() {
        return this + ', dictada por ' + this.docente + ', durante el periodo ' + this.periodo;
    }
}