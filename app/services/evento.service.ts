/**
 * Created by juan on 02/11/16.
 */


import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, URLSearchParams, Response} from "@angular/http";
import {Edificio} from "../entities/edificio";
import {Observable} from "rxjs";
import {Clase} from "../entities/clase";
import {DatePipe} from "@angular/common";
import {Evento} from "../entities/evento";
@Injectable()
export class EventoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({
        url: 'http://localhost/saga/api/eventos',
        headers: this.headers
    });
    constructor(private http: Http) { }

    getEventos(fecha: Date, edificio : Edificio) : Observable<Evento[]> {
        let formatFecha = new DatePipe('es').transform(fecha, 'yyyy-MM-dd');
        let params = new URLSearchParams();
        params.set('fecha', formatFecha);
        params.set('aula.edificio.id', edificio.id.toString());
        params.set('include', 'aula');
        return this.http
            .get(this.options.url, this.options.merge({search: params}))
            .map((r: Response) => r.json().data as Evento[]);
    }
}