import {Entity} from "../commons/entity";
import {Grupo} from "./grupo";
import {Rol} from "./rol";
export class Usuario implements Entity {
    id: number = null;
    nombre_usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    estado: number = 1;
    rol: Rol = new Rol();

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
