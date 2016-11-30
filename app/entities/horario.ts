import {Comision} from "./comision";
import {Aula} from "./aula";
import {Entity} from "./entity";

export class Horario implements Entity {
    id: number = null;
    dia: number;
    hora_inicio: string;
    duracion: string;
    descripcion: string;
    comision: Comision = new Comision();
    aula: Aula = new Aula();

    constructor(value : Object = {}) {
        Object.assign(this, value);
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
        return new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDay(), parseInt(a[0]), parseInt(a[1]), parseInt(a[2]));
    }
}
