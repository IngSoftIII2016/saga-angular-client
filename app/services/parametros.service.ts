import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Parametros} from "../entities/parametros";
import {Router} from "@angular/router";

@Injectable()
export class ParametrosService extends GenericService<Parametros> {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    protected valueToEntity(value: Object): Parametros {
        return new Parametros(value);
    }

    protected getResourcePath(): string {
        return 'Parametros';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions();
    }
}