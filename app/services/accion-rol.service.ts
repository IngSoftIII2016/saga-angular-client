import {Injectable} from "@angular/core";
import {RelationService} from "../commons/RelationService";
import {AccionRol} from "../entities/accion-rol";
import {QueryOptions} from "../commons/generic.service";
import {Http} from "@angular/http";
/**
 * Created by juan on 24/11/16.
 */
@Injectable()
export class AccionRolService extends RelationService<AccionRol> {

    constructor(http: Http) {
        super(http)
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