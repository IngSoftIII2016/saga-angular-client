import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "./generic.service";
import {Localidad} from "../entities/localidad";

@Injectable()
export class LocalidadService extends GenericService<Localidad> {

    constructor(http: Http) {
        super(http);
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
