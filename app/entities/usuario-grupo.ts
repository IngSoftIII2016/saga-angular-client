import {Entity} from "../commons/entity";
import {Usuario} from "./usuario";
import {Grupo} from "./grupo";

export class UsuarioGrupo implements Entity {

    id: number;
    usuario: Usuario = new Usuario();
    grupo: Grupo = new Grupo();

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}