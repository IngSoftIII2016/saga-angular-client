import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";
import {Asignatura} from "../entities/asignatura";

@Injectable()
export class AsignaturaService extends GenericService<Asignatura> {

    protected getResourcePath(): string {
        return 'asignaturas';
    }

    constructor(http: Http) {
        super(http);
    }

}