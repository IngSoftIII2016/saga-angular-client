import {Injectable} from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Asignatura} from "../entities/asignatura";
import {Router} from "@angular/router";

@Injectable()
export class AsignaturaService extends GenericService<Asignatura> {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    protected getResourcePath(): string {
        return 'asignaturas';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions();
    }
}