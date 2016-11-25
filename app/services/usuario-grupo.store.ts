import {Injectable} from "@angular/core";
import {GenericStore} from "./generic.store";
import {UsuarioGrupo} from "../entities/usuario-grupo";
import {UsuarioGrupoService} from "./usuario-grupo.service";
/**
 * Created by juan on 24/11/16.
 */
@Injectable()
export class UsuarioGrupoStore extends GenericStore<UsuarioGrupo, UsuarioGrupoService> {

    constructor(private usuarioGrupoService: UsuarioGrupoService) {
        super(usuarioGrupoService);
    }

}
