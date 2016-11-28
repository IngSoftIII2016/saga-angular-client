import {Entity} from "./entity";
import {Usuario} from "./usuario";
import {Grupo} from "./grupo";

export class UsuarioGrupo implements Entity {

    id: number;
    anio: number;
    regimen: string;
    usuario: Usuario = new Usuario();
    grupo: Grupo = new Grupo();

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}