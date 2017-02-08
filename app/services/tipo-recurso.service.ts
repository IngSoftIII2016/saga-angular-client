import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Localidad} from "../entities/localidad";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {TipoRecurso} from "../entities/tipo-recurso";

@Injectable()
export class TipoRecursoService extends GenericService<TipoRecurso> {

    constructor(http: Http, auth: AuthenticationService) {
        super(http, auth);
    }

    protected valueToEntity(value: Object): TipoRecurso {
        return new TipoRecurso(value);
    }

    protected getResourcePath(): string {
        return 'tiporecursos';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions();
    }
}
