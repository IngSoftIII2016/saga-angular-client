import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import {Localidad} from "../entities/localidad";

@Injectable()
export class LocalidadService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private localidadUrl = 'http://localhost/saga/api/localidades';

    constructor(private http: Http) {
    }

    getLocalidadMedium() {
        return this.http.get(this.localidadUrl)
            .toPromise()
            .then(res => <Localidad[]> res.json().data)
            .then(data => {
                return data;
            });
    }

    delete(id: number): Promise<void> {
        const url = `${this.localidadUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(nombre: string): Observable<Localidad> {
        return this.http.post(this.localidadUrl, JSON.stringify({
            data: {
                nombre: nombre,
                id: ""
            }
        }), {headers: this.headers})
            .map(this.extractData).catch(this.handleError);

    }

    private extractData(res: Response) {
        console.log(res);
        let body = res.json();
        return body.data || {};

    }

    public update(localidad: Localidad): Promise<Localidad> {
        const url = `${this.localidadUrl}`;
        return this.http
            .put(url, JSON.stringify({data: {nombre: localidad.nombre, id: localidad.id}}), {headers: this.headers})
            .toPromise()
            .then(() => localidad)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) { // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    /*
     private handleError(error: any): Promise<any> {
     console.error('An error occurred', error);
     return Promise.reject(error.message || error);
     }
     */
}
