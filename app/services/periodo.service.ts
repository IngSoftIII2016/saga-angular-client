import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";
import {Periodo} from "../entities/periodo";

@Injectable()
export class PeriodoService extends GenericService<Periodo> {

	protected getResourcePath(): string {
		return 'periodos';
	}

	constructor(private http: Http) {
		super(http);
	}

}
