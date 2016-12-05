import {Comision} from "./comision";
import {Aula} from "./aula";
import {Entity} from "../commons/entity";
import {CALENDAR_LOCALE_ES} from "../commons/calendar-locale-es"

export class Horario implements Entity {
    id: number = null;
    frecuencia_semanas: number = 1;
    dia: number;
    hora_inicio: string = '09:00:00';
    duracion: string = '01:00:00';
    descripcion: string = "";
    comision: Comision = new Comision();
    aula: Aula = new Aula();

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }

    public diaString() {
        return CALENDAR_LOCALE_ES.dayNames[this.dia];
    }

    public getHoraInicio(): Date {
        return this.parseHora(this.hora_inicio);
    }
    public getDuracion() : Date {
        return this.parseHora(this.duracion);
    }
    public parseHora(hora : string) {
        let fecha: Date = new Date(0);
        let a = hora.split(':');
        return new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDay()+1, parseInt(a[0]), parseInt(a[1]), parseInt(a[2]));
    }
}
