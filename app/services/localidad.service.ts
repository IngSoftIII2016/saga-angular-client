import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";
import {Localidad} from "../entities/localidad";

@Injectable()
export class LocalidadService extends GenericService<Localidad> {

    protected getResourcePath(): string {
        return 'localidades';
    }

    protected getInclude(): string{
        return '';
    }

    constructor(private http: Http) {
        super(http);
    }

}
