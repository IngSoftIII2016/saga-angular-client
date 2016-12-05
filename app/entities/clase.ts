import {Horario} from "./horario";
import {Aula} from "./aula";
import {Entity} from "../commons/entity";
import {Calendar} from "primeng/components/calendar/calendar";
import {CALENDAR_LOCALE_ES} from "../components/commons/calendar-locale-es";

export class Clase implements Entity {

    id: number = null;
    fecha: string;
    hora_inicio: string = '09:00:00';
    hora_fin: string = '10:00:00';
    horario: Horario = new Horario();
    aula: Aula = new Aula();
    comentario: string;

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
    public getFecha(): Date {
        let fecha = new Date(this.fecha)
        fecha.setTime(fecha.getTime() + (3*60*60*1000));
        return fecha;
    }
    public setFecha(fecha: Date) {
        this.fecha = fecha.format("yyyy-mm-dd");
    }

    public getHoraInicio(): Date {
        return this.parseHora(this.hora_inicio);
    }
    public getHoraFin() : Date {
        return this.parseHora(this.hora_fin);
    }
    public parseHora(hora : string) {
        let fecha: Date = new Date(0);
        let a = hora.split(':');
        return new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDay()+1, parseInt(a[0]), parseInt(a[1]), parseInt(a[2]));
    }
}