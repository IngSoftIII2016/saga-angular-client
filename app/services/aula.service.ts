import {Injectable} from '@angular/core';
import {Headers, Http, Response, BaseRequestOptions} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";
import {Aula} from "../entities/aula";
import {Edificio} from "../entities/edificio";
import {QueryOptions} from "./generic.service";

@Injectable()
export class AulaService extends GenericService<Aula> {

    private url = 'http://localhost/saga/api/aulas';
    private options = new BaseRequestOptions();

    constructor(http: Http) {
        super(http);
    }

    protected getResourcePath(): string {
        return 'aulas';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions(
            {
                includes: ['edificio'],
                sorts: [
                    {field : 'edificio.id', order: 1},
                    {field : 'nombre', order : 1}]
            })
    }

    queryByEdificio(edificio: Edificio): Observable<Aula[]> {
        return this.query(new QueryOptions({
            filters: {'edificio.id': edificio.id}
        }))
    }

}