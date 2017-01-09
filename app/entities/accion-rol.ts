import {Entity} from "../commons/entity";
import {Rol} from "./rol";
import {Accion} from "./accion";
/**
 * Created by juan on 24/11/16.
 */
export class AccionRol implements Entity {

    id: number = null;
    anio: number;
    regimen: string;
    accion: Accion = new Accion();
    rol: Rol = new Rol();

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
