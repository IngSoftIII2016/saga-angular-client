import {Injectable, Inject} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Sede} from '../entities/sede';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "../commons/generic.service";
import {QueryOptions} from "../commons/generic.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class SedeService extends GenericService<Sede> {

    constructor(http: Http, auth: AuthenticationService) {
        super(http, auth);
    }

    protected valueToEntity(value: Object): Sede {
        return new Sede(value);
    }

    protected getResourcePath(): string {
		return 'sedes';
	}

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions();
    }
}
