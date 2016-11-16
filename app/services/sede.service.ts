import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Sede} from '../entities/sede';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";

@Injectable()
export class SedeService extends GenericService<Sede> {

    protected getResourcePath(): string {
		return 'sedes';
	}

    constructor(private http: Http) {
    	super(http);
	}

}
