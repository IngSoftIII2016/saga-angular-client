import {Entity} from "../commons/entity";
import {Rol} from "./rol";
export class Usuario implements Entity {
    id: number = null;
    nombre_usuario: string= null;
    nombre: string= null;
    apellido: string= null;
    email: string= null;
    contrasenia: string;
    estado: number = 1;
    rol: Rol = new Rol();

    constructor(value : any = {}) {
        Object.assign(this, value);
        this.rol = value.rol ? new Rol(value.rol) : null;
    }

    isInvitado(): boolean {
        return !this.rol || this.rol.id == 1;
    }

    isAdmin(): boolean {
        return this.rol != null && this.rol.id == 2;
    }

    toString(): string {
        return `${this.nombre} (${this.rol.nombre})`;
    }
}
