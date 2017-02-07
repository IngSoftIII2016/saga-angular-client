import {Entity} from "../commons/entity";
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

    isInvitado(): boolean {
        return !this.rol || this.rol.id == 1;
    }

    isAdmin(): boolean {
        return !this.rol || this.rol.id == 2;
    }

    toString(): string {
        return `${this.nombre} (${this.rol.nombre})`;
    }
}
