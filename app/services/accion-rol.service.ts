import {Injectable} from "@angular/core";
import {AccionRol} from "../entities/accion-rol";
import {QueryOptions} from "../commons/generic.service";
import {Http} from "@angular/http";
import {RelationService} from "../commons/relation.service";
import {Router} from "@angular/router";
/**
 * Created by juan on 24/11/16.
 */
@Injectable()
export class AccionRolService extends RelationService<AccionRol> {

    constructor(http: Http, router: Router) {
        super(http, router)
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