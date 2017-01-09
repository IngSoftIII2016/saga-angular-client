import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Grupo} from "../entities/grupo";
import {Router} from "@angular/router";

@Injectable()
export class GrupoService extends GenericService<Grupo> {

	constructor(http: Http, router: Router) {
		super(http, router);
	}

	protected getResourcePath(): string {
		return 'grupos';
	}

	public getDefaultQueryOptions() : QueryOptions {
		return new QueryOptions();
	}

}