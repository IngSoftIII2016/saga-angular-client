import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Aula} from "../entities/aula";
import {Http, BaseRequestOptions, URLSearchParams, RequestOptions} from "@angular/http";
import {Edificio} from "../entities/edificio";

@Injectable()
export class AulaService {
    private url = 'app/aulas';
    private options = new BaseRequestOptions();

    constructor(private http: Http) { }

    getAulas(): Promise<Aula[]> {
        return this.http
            .get(this.url)
            .toPromise()
            .then(res => res.json().data as Aula[])
            .catch(this.handleError);
    }
    getAulasByEdificio(edificio: Edificio): Promise<Aula[]> {
        return this.http
            .get(`${this.url}?Edificio_id=${edificio.id}`)
            .toPromise()
            .then(res => res.json().data as Aula[])
            .catch(this.handleError);
    }
    private handleError(error : any) : Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
