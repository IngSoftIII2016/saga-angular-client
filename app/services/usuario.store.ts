import {UsuarioService} from "./usuario.service";
import {Usuario} from "../entities/usuario";
import {GenericStore} from "../commons/generic.store";
import {QueryOptions} from "../commons/generic.service";
import {Injectable} from "@angular/core";
/**
 * Created by juan on 20/11/16.
 */
@Injectable()
export class UsuarioStore extends GenericStore<Usuario, UsuarioService> {

    constructor(private usuarioService: UsuarioService) {
        super(usuarioService);
    }

}
