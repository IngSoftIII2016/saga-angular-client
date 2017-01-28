import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "../commons/generic.service";
import {Edificio} from "../entities/edificio";
import {QueryOptions} from "../commons/generic.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class EdificioService extends GenericService<Edificio> {

    constructor(http: Http, auth: AuthenticationService) {
        super(http, auth);
    }

    protected valueToEntity(value: Object): Edificio {
        return new Edificio(value);
    }

    protected getResourcePath(): string {
        return 'edificios';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions({
            includes : ['localidad.sede'],
            page: -1
        });
    }
}