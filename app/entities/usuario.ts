import {Entity} from "./entity";
import {Grupo} from "./grupo";
export class Usuario implements Entity {
    id: number = null;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    grupos: Grupo[] =[];

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
