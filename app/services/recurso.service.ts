import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Evento} from "../entities/evento";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {Recurso} from "../entities/recurso";

@Injectable()
export class RecursoService extends GenericService<Recurso> {


    constructor(http: Http, auth: AuthenticationService) {
        super(http, auth);
    }

    protected valueToEntity(value: Object): Recurso {
        return new Recurso(value);
    }

    protected getResourcePath(): string {
        return 'recursos';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions({
            includes: ['tipo_recurso','aula']
        });
    }

}