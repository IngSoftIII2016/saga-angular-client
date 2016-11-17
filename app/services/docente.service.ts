import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";
import {Docente} from "../entities/docente";

@Injectable()
export class DocenteService extends GenericService<Docente> {

	protected getResourcePath(): string {
		return 'docentes';
	}


	constructor(http: Http) {
		super(http);
	}

}