import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Docente} from "../entities/docente";
import {Router} from "@angular/router";

@Injectable()
export class DocenteService extends GenericService<Docente> {

	constructor(http: Http, router: Router) {
		super(http, router);
	}

	protected getResourcePath(): string {
		return 'docentes';
	}

	public getDefaultQueryOptions() : QueryOptions {
		return new QueryOptions();
	}

}