import {Entity} from "./entity";
import {Grupo} from "./grupo";
export class Usuario implements Entity {
    id: number = null;
    nombre_usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: number;
    contrasenia: string;
    estado: number;


    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
