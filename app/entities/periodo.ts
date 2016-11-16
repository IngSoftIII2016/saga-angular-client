import {Entity} from "./Entity";
export class Periodo implements Entity {
    id: number;
    fecha_inicio : string;
    fecha_fin : string ;
	descripcion: string;

	constructor(value: Object = {}) {
	    Object.assign(this, value);
    }
}
