import {Comision} from "./comision";
import {Aula} from "./aula";
import {Entity} from "./entity";

export class Horario implements Entity {
    id: number = null;
    dia: number;
    hora_inicio: number;
    duracion: number;
    descripcion: string;
    comision: Comision = new Comision();
    aula: Aula = new Aula();

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
