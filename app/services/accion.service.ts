import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Accion} from "../entities/accion";
import {Router} from "@angular/router";

@Injectable()
export class AccionService extends GenericService<Accion> {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    protected getResourcePath(): string {
        return 'acciones';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions();
    }
}