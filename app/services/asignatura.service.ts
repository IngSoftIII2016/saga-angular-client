import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Asignatura} from "../entities/asignatura";

@Injectable()
export class AsignaturaService extends GenericService<Asignatura> {

    constructor(http: Http) {
        super(http);
    }

    protected getResourcePath(): string {
        return 'asignaturas';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions();
    }

}