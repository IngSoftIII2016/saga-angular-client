import {Injectable, Inject} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Sede} from '../entities/sede';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";

@Injectable()
export class SedeService extends GenericService<Sede> {

    constructor(@Inject(Http) http: Http) {
        super(http);
    }

    protected getResourcePath(): string {
		return 'sedes';
	}
}
