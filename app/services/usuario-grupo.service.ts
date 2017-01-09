import {Injectable} from "@angular/core";
import {RelationService} from "../commons/relation.service";
import {UsuarioGrupo} from "../entities/usuario-grupo";
import {QueryOptions} from "../commons/generic.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
/**
 * Created by juan on 24/11/16.
 */
@Injectable()
export class UsuarioGrupoService extends RelationService<UsuarioGrupo> {

    constructor(http: Http, router: Router) {
        super(http, router);
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