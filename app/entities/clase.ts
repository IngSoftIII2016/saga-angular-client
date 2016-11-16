import {Horario} from "./horario";
import {Aula} from "./aula";
import {Entity} from "./Entity";

export class Clase implements Entity {

    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    horario: Horario;
    aula: Aula;
    comentario: string;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }

}