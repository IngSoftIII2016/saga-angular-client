import {Entity} from "../commons/entity";
import {toFechaString} from "../commons/utils";
import {parseMySQLDate} from "../commons/utils";
export class Periodo implements Entity {
    id: number = null;
    fecha_inicio : string;
    fecha_fin : string ;
	descripcion: string;

	constructor(value: Object = {}) {
	    Object.assign(this, value);
    }

    public toString(): string {
	    return this.descripcion + '(' + toFechaString(parseMySQLDate(this.fecha_inicio)) + ' - ' + toFechaString(parseMySQLDate(this.fecha_fin)) + ')';
    }
}
