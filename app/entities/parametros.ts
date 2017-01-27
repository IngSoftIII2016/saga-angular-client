import {Entity} from "../commons/entity";

export class Parametros implements Entity{
    id: number = null;
    clave: string;
    valor: string;
    descripcion: string;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}
