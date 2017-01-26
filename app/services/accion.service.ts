import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Accion} from "../entities/accion";
import {Router} from "@angular/router";

@Injectable()
export class AccionService extends GenericService<Accion> {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    protected valueToEntity(value: Object): Accion {
        return new Accion(value);
    }

    protected getResourcePath(): string {
        return 'acciones';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions();
    }
}