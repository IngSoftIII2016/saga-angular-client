import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "./generic.service";
import {Docente} from "../entities/docente";

@Injectable()
export class DocenteService extends GenericService<Docente> {

	constructor(http: Http) {
		super(http);
	}

	protected getResourcePath(): string {
		return 'docentes';
	}

	public getDefaultQueryOptions() : QueryOptions {
		return new QueryOptions();
	}

}