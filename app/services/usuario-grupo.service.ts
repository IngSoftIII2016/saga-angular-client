import {Injectable} from "@angular/core";
import {RelationService} from "./RelationService";
import {UsuarioGrupo} from "../entities/usuario-grupo";
import {QueryOptions} from "./generic.service";
import {Http} from "@angular/http";
/**
 * Created by juan on 24/11/16.
 */
@Injectable()
export class UsuarioGrupoService extends RelationService<UsuarioGrupo> {

    constructor(http: Http) {
        super(http)
    }

    protected getResourcePath(): string {
        return 'usuariogrupo';
    }

    getDefaultQueryOptions(): QueryOptions {
        return new QueryOptions({
            includes: ['usuario', 'grupo'],
            sorts: [
                {field: 'usuario.id', order: 1},
                {field: 'grupo.id', order: 1}
            ]
        });
    }



}