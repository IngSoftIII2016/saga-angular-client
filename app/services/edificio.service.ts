import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";
import {Edificio} from "../entities/edificio";
import {QueryOptions} from "./generic.service";

@Injectable()
export class EdificioService extends GenericService<Edificio> {

    constructor(http: Http) {
        super(http);
    }

    protected getResourcePath(): string {
        return 'edificios';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions({
            includes : ['localidad'],
            page: -1
        });
    }
}