import { Observable } from "rxjs";
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

    public getClave(clave: string) : Observable<Parametros> {
        let qo = this.getDefaultQueryOptions();
        qo.merge({filters: {'clave': clave}});
        return this.query(qo).map(p => p[0]);
    }
}