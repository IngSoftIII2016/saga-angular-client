import {Injectable} from "@angular/core";
import {AsignaturaCarrera} from "../entities/asignatura-carrera";
import {QueryOptions} from "../commons/generic.service";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {RelationService} from "../commons/relation.service";
import {AuthenticationService} from "./authentication.service";
/**
 * Created by juan on 24/11/16.
 */
@Injectable()
export class AsignaturaCarreraService extends RelationService<AsignaturaCarrera> {

    constructor(http: Http, auth: AuthenticationService) {
        super(http, auth)
    }

    protected valueToEntity(value: Object): AsignaturaCarrera {
        return new AsignaturaCarrera(value);
    }

    protected getResourcePath(): string {
        return 'asignaturacarrera';
    }

    getDefaultQueryOptions(): QueryOptions {
        return new QueryOptions({
            includes: ['asignatura', 'carrera'],
            sorts: [
                {field: 'carrera.id', order: 1},
                {field: 'anio', order: 1},
                {field: 'regimen', order: 1},
                {field: 'asignatura.nombre', order: 1}
            ]
        });
    }

}