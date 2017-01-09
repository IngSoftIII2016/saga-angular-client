import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Localidad} from "../entities/localidad";
import {Router} from "@angular/router";

@Injectable()
export class LocalidadService extends GenericService<Localidad> {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    protected getResourcePath(): string {
        return 'localidades';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions({
            includes: ['sede']
        });
    }
}
