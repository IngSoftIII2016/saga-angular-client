import {Injectable} from '@angular/core';
import { Http } from '@angular/http';

import {GenericService, QueryOptions} from "../commons/generic.service";
import {Asignatura} from "../entities/asignatura";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class AsignaturaService extends GenericService<Asignatura> {

    constructor(http: Http, auth: AuthenticationService) {
        super(http, auth);
    }

    protected valueToEntity(value: Object): Asignatura {
        return new Asignatura(value);
    }

    protected getResourcePath(): string {
        return 'asignaturas';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions();
    }

}