import {Injectable} from "@angular/core";
<<<<<<< HEAD:app/_services/aula.service.ts
import {Observable} from "rxjs";
import {Aula} from "../_entities/aula";
=======
import {Aula} from "../entities/aula";
>>>>>>> bed8b552092a8a02b3907efe61ac8b67074f1ab2:app/services/aula.service.ts
import {Http, BaseRequestOptions, URLSearchParams, RequestOptions} from "@angular/http";
import {Edificio} from "../_entities/edificio";

@Injectable()
export class AulaService {
    private url = 'http://localhost/saga/api/aulas';
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
