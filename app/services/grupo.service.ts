import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";
import {Grupo} from "../entities/grupo";

@Injectable()
export class GrupoService extends GenericService<Grupo> {

	protected getResourcePath(): string {
		return 'grupos';
	}

	protected getInclude(): string{
		return '';
	}

	constructor(private http: Http) {
		super(http);
	}

}