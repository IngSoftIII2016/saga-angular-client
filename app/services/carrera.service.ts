import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Carrera} from "../entities/carrera";
import {Router} from "@angular/router";

@Injectable()
export class CarreraService extends GenericService<Carrera> {

	constructor(http: Http, router: Router) {
		super(http, router);
	}

	protected valueToEntity(value: Object): Carrera {
		return new Carrera(value);
	}

	protected getResourcePath(): string {
		return 'carreras';
	}

    public getDefaultQueryOptions() : QueryOptions {
	    return new QueryOptions();
    }




}