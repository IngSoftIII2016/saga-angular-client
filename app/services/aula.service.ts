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


    protected getResourcePath(): string {
        return 'aulas';
    }

    constructor(http: Http) {
        super(http);
    }

    queryByEdificio(edificio: Edificio): Observable<Aula[]> {
        return this.query(new QueryOptions({
            filters: [{}]
        }))
    }
    private handleError(error : any) : Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}