import {Entity} from "../commons/entity";
export class Periodo implements Entity {
    id: number = null;
    fecha_inicio : string;
    fecha_fin : string ;
	descripcion: string;

	constructor(value: Object = {}) {
	    Object.assign(this, value);
    }
}
