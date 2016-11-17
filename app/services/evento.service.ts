import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService} from "./generic.service";
import {Evento} from "../entities/evento";

@Injectable()
export class EventoService extends GenericService<Evento> {

    protected getResourcePath(): string {
        return 'eventos';
    }

    constructor(http: Http) {
        super(http);
    }

}