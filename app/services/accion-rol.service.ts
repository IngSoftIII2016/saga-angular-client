import {Injectable} from "@angular/core";
import {AccionRol} from "../entities/accion-rol";
import {QueryOptions} from "../commons/generic.service";
import {Http} from "@angular/http";
import {RelationService} from "../commons/relation.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
/**
 * Created by juan on 24/11/16.
 */
@Injectable()
export class AccionRolService extends RelationService<AccionRol> {

    constructor(http: Http, auth: AuthenticationService) {
        super(http, auth)
    }

    protected valueToEntity(value: Object): AccionRol {
        return new AccionRol(value)
    }

    protected getResourcePath(): string {
        return 'accionrol';
    }

    getDefaultQueryOptions(): QueryOptions {
        return new QueryOptions({
            includes: ['accion', 'rol']

        });
    }

}