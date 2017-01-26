import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Evento} from "../entities/evento";
import {Router} from "@angular/router";

@Injectable()
export class EventoService extends GenericService<Evento> {


    constructor(http: Http, router: Router) {
        super(http, router);
    }

    protected valueToEntity(value: Object): Evento {
        return new Evento(value);
    }

    protected getResourcePath(): string {
        return 'eventos';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions({
            includes: ['aula.edificio.localidad.sede']
        });
    }

}