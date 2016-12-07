import {Aula} from "./aula";
import {Entity} from "../commons/entity";

import {parseMySQLDate, parseMySQLTime, toMySQLDate, toMySQLTime} from "../commons/utils";
import {parseMySQLDateTime} from "../commons/utils";
/**
 * Created by juan on 07/11/16.
 */

export class Evento implements Entity {
    id: number = null;
    fecha: string;
    hora_inicio: string = '09:00:00';
    hora_fin: string = '10:00:00';
    aula: Aula = new Aula();
    motivo: string;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
    getFechaDate(): Date {
        return parseMySQLDate(this.fecha);
    }

    setFechaDate(date: Date) {
        this.fecha = toMySQLDate(date);
    }

    getHoraInicioDate(): Date {
        return parseMySQLDateTime(this.fecha, this.hora_inicio);
    }

    setHoraInicioDate(date: Date) {
        this.hora_inicio = toMySQLTime(date);
    }

    getHoraFinDate(): Date {
        return parseMySQLDateTime(this.fecha, this.hora_fin);
    }

    setHoraFinDate(date: Date) {
        this.hora_fin = toMySQLTime(date);
    }
}