import {Horario} from "./horario";
import {Aula} from "./aula";
import {Entity} from "../commons/entity";
import {Calendar} from "primeng/components/calendar/calendar";
import {CALENDAR_LOCALE_ES} from "../commons/calendar-locale-es";
import {parseMySQLDate, parseMySQLTime, toMySQLDate, toMySQLTime} from "../commons/utils";
import {parseMySQLDateTime} from "../commons/utils";
import {toFechaString} from "../commons/utils";

export class Clase implements Entity {

    id: number = null;
    fecha: string;
    hora_inicio: string = '09:00:00';
    hora_fin: string = '10:00:00';
    horario: Horario = new Horario();
    aula: Aula = new Aula();
    comentario: string;
    hora_llegada: string;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }

    getFechaDate(): Date {
        return parseMySQLDate(this.fecha);
    }

    setFechaDate(date: Date) {
        this.fecha = toMySQLDate(date);
    }

    getHoraInicioDate(): Date {
        return parseMySQLTime(this.hora_inicio);
    }

    setHoraInicioDate(date: Date) {
        this.hora_inicio = toMySQLTime(date);
    }

    getHoraFinDate(): Date {
        return parseMySQLTime(this.hora_fin);
    }

    setHoraFinDate(date: Date) {
        this.hora_fin = toMySQLTime(date);
    }

    getHoraLlegada(): Date {
        return this.hora_llegada ? parseMySQLTime(this.hora_llegada) : null;
    }

    setHoraLlegada(date: Date) {
        this.hora_llegada = date ? toMySQLTime(date) : null;
    }

    public getFechaString(): string {
        return toFechaString(parseMySQLDate(this.fecha));
    }
}