import {Injectable} from '@angular/core';
import {Headers, Http, Response, BaseRequestOptions} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";
import {Aula} from "../entities/aula";
import {Edificio} from "../entities/edificio";

@Injectable()
export class AulaService extends GenericService<Aula> {

    private url = 'http://localhost/saga/api/aulas';
    private options = new BaseRequestOptions();


    protected getResourcePath(): string {
        return 'aulas';
    }

    protected getInclude(): string{
        return '?include=edificio';
    }

    constructor(private http: Http) {
        super(http);
    }

    getAulasByEdificio(edificio: Edificio): Promise<Aula[]> {
        return this.http
            .get(`${this.url}?edificio.id=${edificio.id}`)
            .toPromise()
            .then(res => res.json().data as Aula[])
            .catch(this.handleError);
    }
    private handleError(error : any) : Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}