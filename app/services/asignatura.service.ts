import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import {Asignatura} from "../entities/asignatura";

@Injectable()
export class AsignaturaService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private asignaturaUrl = 'http://localhost/saga/api/asignaturas';

    constructor(private http: Http) {
    }

    getAsignaturaMedium() {
        return this.http.get(this.asignaturaUrl)
            .toPromise()
            .then(res => <Asignatura[]> res.json().data)
            .then(data => {
                return data;
            });
    }

    delete(id: number): Promise<void> {
        const url = `${this.asignaturaUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(nombre: string): Observable<Asignatura> {
        return this.http.post(this.asignaturaUrl, JSON.stringify({
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

    public update(asignatura: Asignatura): Promise<Asignatura> {
        const url = `${this.asignaturaUrl}`;
        return this.http
            .put(url, JSON.stringify({data: {nombre: asignatura.nombre, id: asignatura.id}}), {headers: this.headers})
            .toPromise()
            .then(() => asignatura)
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
