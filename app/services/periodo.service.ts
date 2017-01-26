import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "../commons/generic.service";
import {Periodo} from "../entities/periodo";
import {QueryOptions} from "../commons/generic.service";
import {Router} from "@angular/router";

@Injectable()
export class PeriodoService extends GenericService<Periodo> {

	constructor(http: Http, router: Router) {
		super(http, router);
	}

    protected valueToEntity(value: Object): Periodo {
	    return new Periodo(value);
    }

	protected getResourcePath(): string {
		return 'periodos';
	}

	public getDefaultQueryOptions() : QueryOptions {
		return new QueryOptions();
	}

}
