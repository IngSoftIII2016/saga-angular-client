import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";
import {Carrera} from "../entities/carrera";

@Injectable()
export class CarreraService extends GenericService<Carrera> {

	protected getResourcePath(): string {
		return 'carreras';
	}
	protected getInclude(): string{
		return '';
	}

	constructor(private http: Http) {
		super(http);
	}

}