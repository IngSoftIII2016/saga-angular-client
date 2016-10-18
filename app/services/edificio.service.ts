import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Edificio} from "../entities/edificio";

@Injectable()
export class EdificioService {
    url = 'app/edificios';

    constructor(private http: Http) { }

    getAll(): Observable<Edificio[]> {
        return this.http.get(this.url)
            .map(res => res.json().data as Edificio[]);
    }
}