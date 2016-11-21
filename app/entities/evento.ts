import {Aula} from "./aula";
import {Entity} from "./Entity";
/**
 * Created by juan on 07/11/16.
 */

export class Evento implements Entity {
    id: number = null;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    aula: Aula = new Aula();
    motivo: string;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
    public getFecha(): Date {
        return new Date(this.fecha);
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
        let fecha: Date = this.getFecha();
        let a = hora.split(':');
        return new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDay(), parseInt(a[0]), parseInt(a[1]), parseInt(a[2]));
    }
}