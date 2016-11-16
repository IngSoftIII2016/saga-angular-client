import {Comision} from "./comision";
import {Aula} from "./aula";
import {Entity} from "./Entity";

export class Horario implements Entity {
    id: number;
    dia: number;
    hora_inicio: number;
    duracion: number;
    descripcion: string;
    comision: Comision;
    aula: Aula;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
