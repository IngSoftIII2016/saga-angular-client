import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Docente} from "../entities/docente";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class DocenteService extends GenericService<Docente> {

	constructor(http: Http, auth: AuthenticationService) {
		super(http, auth);
	}

	protected valueToEntity(value: Object): Docente {
		return new Docente(value);
	}

	protected getResourcePath(): string {
		return 'docentes';
	}

	public getDefaultQueryOptions() : QueryOptions {
		return new QueryOptions();
	}

}