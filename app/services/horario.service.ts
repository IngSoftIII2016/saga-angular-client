import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Horario} from "../entities/horario";
import {Router} from "@angular/router";

@Injectable()
export class HorarioService extends GenericService<Horario> {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    protected getResourcePath(): string {
        return 'horarios';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions(
            {
                includes: ['comision.asignatura', 'comision.periodo', 'comision.docente',  'aula.edificio.localidad.sede']
            })
    }

}/**
 * Created by Federico on 29/11/2016.
 */
