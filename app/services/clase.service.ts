import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, URLSearchParams, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Clase} from "../entities/clase";
import {DatePipe} from "@angular/common";
import {Edificio} from "../entities/edificio";

@Injectable()
export class ClaseService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({
        url: 'http://localhost/saga/api/clases',
        headers: this.headers
    });

    constructor(private http: Http) { }

    getClases(fecha: Date, edificio : Edificio) : Observable<Clase[]> {
        let formatFecha = new DatePipe('es').transform(fecha, 'yyyy-MM-dd');
        let params = new URLSearchParams();
        params.set('fecha', formatFecha);
        params.set('aula.edificio.id', edificio.id.toString());
        params.set('include', 'aula');
        return this.http
            .get(this.options.url, this.options.merge({search: params}))
            .map((r: Response) => r.json().data as Clase[]);
    }
}

