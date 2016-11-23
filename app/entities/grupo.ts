import {Entity} from "./entity";
export class Grupo implements Entity {
    id: number = null;
    nombre: string;
	descripcion: string;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}