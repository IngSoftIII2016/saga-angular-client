import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Comision} from "../entities/comision";
import {Router} from "@angular/router";

@Injectable()
export class ComisionService extends GenericService<Comision> {

	constructor(http: Http, router: Router) {
		super(http, router);
	}

	protected getResourcePath(): string {
		return 'comisiones';
	}

	public getDefaultQueryOptions() : QueryOptions {
		return new QueryOptions(
			{
				includes: ['periodo', 'asignatura', 'docente'],
				sorts: [
					{field : 'asignatura.nombre', order: 1}]
			})
	}

}