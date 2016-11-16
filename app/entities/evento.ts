import {Aula} from "./aula";
import {Entity} from "./Entity";
/**
 * Created by juan on 07/11/16.
 */

export class Evento implements Entity {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    aula: Aula;
    motivo: string;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}