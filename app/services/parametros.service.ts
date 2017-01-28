import { Observable } from "rxjs";
import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Parametro} from "../entities/parametros";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class ParametrosService extends GenericService<Parametro> {

    constructor(http: Http, auth: AuthenticationService) {
        super(http, auth);
    }

    protected valueToEntity(value: Object): Parametro {
        return new Parametro(value);
    }

    protected getResourcePath(): string {
        return 'Parametros';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions();
    }

    public getClave(clave: string) : Observable<Parametro> {
        let qo = this.getDefaultQueryOptions();
        qo.merge({filters: {'clave': clave}});
        return this.query(qo).map(p => p[0]);
    }
}