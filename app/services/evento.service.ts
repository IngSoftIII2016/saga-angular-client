import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "./generic.service";
import {Evento} from "../entities/evento";

@Injectable()
export class EventoService extends GenericService<Evento> {


    constructor(http: Http) {
        super(http);
    }

    protected getResourcePath(): string {
        return 'eventos';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions({
            includes: ['aula.edificio.localidad']
        });
    }

}