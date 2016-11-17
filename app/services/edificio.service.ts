import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";
import {Edificio} from "../entities/edificio";

@Injectable()
export class EdificioService extends GenericService<Edificio> {

    private edificioUrl = 'http://localhost/saga/api/edificios';
    protected getResourcePath(): string {
        return 'edificios';
    }

    protected getInclude(): string{
        return '';
    }

    constructor(private http: Http) {
        super(http);
    }

    private handleError (error: Response | any) { // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else { errMsg = error.message ? error.message : error.toString(); }
        console.error(errMsg); return Observable.throw(errMsg);
    }

    getAll(): Promise<Edificio[]> {
        return this.http
            .get(this.edificioUrl)
            .toPromise()
            .then(res => res.json().data as Edificio[])
            .catch(this.handleError);
    }

    getById(id:number): Promise<Edificio> {
        return this.http
            .get(`${this.edificioUrl}/${id}`)
            .toPromise()
            .then(res => res.json().data as Edificio)
            .catch(this.handleError)
    }

}