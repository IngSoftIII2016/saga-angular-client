export class Periodo {
    id: number;
    fecha_inicio : string;
    fecha_fin : string ;
	descripcion : string;

	constructor(values: Object = {}) {
	    Object.assign(this, values);
    }
}
