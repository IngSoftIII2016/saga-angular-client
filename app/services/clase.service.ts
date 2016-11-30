import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "./generic.service";
import {Clase} from "../entities/clase";

@Injectable()
export class ClaseService extends GenericService<Clase> {

    constructor(http: Http) {
        super(http);
    }

    protected getResourcePath(): string {
        return 'clases';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions({
            includes: ['aula.edificio.localidad', 'horario.comision.asignatura']
        });
    }

/*
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
*/
}