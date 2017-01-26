import {Injectable} from '@angular/core';
import {Headers, Http, Response, BaseRequestOptions} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "../commons/generic.service";
import {Aula} from "../entities/aula";
import {Edificio} from "../entities/edificio";
import {QueryOptions} from "../commons/generic.service";
import {Router} from "@angular/router";

@Injectable()
export class AulaService extends GenericService<Aula> {

    private url = 'http://localhost/saga/api/aulas';
    private options = new BaseRequestOptions();

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    protected valueToEntity(value: Object): Aula {
        return new Aula(value);
    }

    protected getResourcePath(): string {
        return 'aulas';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions(
            {
                includes: ['edificio.localidad.sede']
            })
    }

    queryByEdificio(edificio: Edificio): Observable<Aula[]> {
        return this.query(new QueryOptions({
            filters: {'edificio.id': edificio.id},
            sorts: [{field: 'ubicacion', order: 1}],
            page: -1
        }))
    }

}