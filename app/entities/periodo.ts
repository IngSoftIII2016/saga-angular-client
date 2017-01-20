import {Entity} from "../commons/entity";
import {toFechaString} from "../commons/utils";
import {parseMySQLDate} from "../commons/utils";
import {toMySQLDate} from "../commons/utils";
export class Periodo implements Entity {
    id: number = null;
    fecha_inicio : string;
    fecha_fin : string ;
	descripcion: string;

	constructor(value: Object = {}) {
	    Object.assign(this, value);
    }

    public getFechaInicioDate(): Date {
        return parseMySQLDate(this.fecha_inicio);
    }

    public setFechaInicioDate(date: Date) {
        this.fecha_inicio = toMySQLDate(date);
    }

    public getFechaFinDate(): Date {
        return parseMySQLDate(this.fecha_fin);
    }

    public setFechaFinDate(date: Date) {
        this.fecha_fin = toMySQLDate(date);
    }
    public getFechaInicioString(): string {
        return toFechaString(parseMySQLDate(this.fecha_inicio));
    }

    public getFechaFinString(): string {
        return toFechaString(parseMySQLDate(this.fecha_fin));
    }

    public toString(): string {
	    return this.descripcion + '(' + toFechaString(parseMySQLDate(this.fecha_inicio)) + ' - ' + toFechaString(parseMySQLDate(this.fecha_fin)) + ')';
    }

}
