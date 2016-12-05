import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Carrera} from "../entities/carrera";

@Injectable()
export class CarreraService extends GenericService<Carrera> {

	constructor(http: Http) {
		super(http);
	}

	protected getResourcePath(): string {
		return 'carreras';
	}

    public getDefaultQueryOptions() : QueryOptions {
	    return new QueryOptions();
    }




}