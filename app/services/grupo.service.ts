import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "./generic.service";
import {Grupo} from "../entities/grupo";

@Injectable()
export class GrupoService extends GenericService<Grupo> {

	constructor(http: Http) {
		super(http);
	}

	protected getResourcePath(): string {
		return 'grupos';
	}

	public getDefaultQueryOptions() : QueryOptions {
		return new QueryOptions();
	}

}