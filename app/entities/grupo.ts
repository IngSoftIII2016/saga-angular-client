import {Entity} from "./Entity";
export class Grupo implements Entity {
    id: number;
    nombre: string;
	descripcion: string;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}