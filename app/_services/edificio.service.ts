import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Edificio} from "../_entities/edificio";

@Injectable()
export class EdificioService {
    url = 'app/edificios';

    constructor(private http: Http) { }

    getAll(): Promise<Edificio[]> {
        return this.http
            .get(this.url)
            .toPromise()
            .then(res => res.json().data as Edificio[])
            .catch(this.handleError);
    }

    getById(id:number): Promise<Edificio> {
        return this.http
            .get(`${this.url}/${id}`)
            .toPromise()
            .then(res => res.json().data as Edificio)
            .catch(this.handleError)
    }

    private handleError(error : any) : Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}