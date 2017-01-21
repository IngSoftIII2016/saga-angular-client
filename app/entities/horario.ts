import {Comision} from "./comision";
import {Aula} from "./aula";
import {Entity} from "../commons/entity";
import {CALENDAR_LOCALE_ES} from "../commons/calendar-locale-es"

import {parseMySQLDate, parseMySQLTime, toMySQLTime} from "../commons/utils";
import {toHoraString} from "../commons/utils";

export class Horario implements Entity {
    id: number = null;
    frecuencia_semanas: number = 1;
    dia: number = 1;
    hora_inicio: string = '09:00:00';
    duracion: string = '01:00:00';
    descripcion: string = "";
    comision: Comision = new Comision();
    aula: Aula = new Aula();

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }

    public diaString() {
        return CALENDAR_LOCALE_ES.dayNames[this.dia];
    }

    public getHoraInicioDate(): Date {
        return parseMySQLTime(this.hora_inicio);
    }

    public setHoraInicioDate(date: Date) {
        this.hora_inicio = toMySQLTime(date);
    }

    public getDuracionDate(): Date {
        return parseMySQLTime(this.duracion);
    }

    public setDuracionDate(date: Date) {
        this.duracion = toMySQLTime(date);
    }

    public toString(): string {
        let inicio = this.getHoraInicioDate();
        let fin = new Date(this.getHoraInicioDate().getTime() + this.getDuracionDate().getTime());
        return this.diaString() + ' de ' + toHoraString(inicio) + ' a ' + toHoraString(fin);
    }

}
