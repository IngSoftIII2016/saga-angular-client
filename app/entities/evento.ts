import {Aula} from "./aula";
import {Entity} from "../commons/entity";
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
        return new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDay(), parseInt(a[0]), parseInt(a[1]), parseInt(a[2]));
    }
}