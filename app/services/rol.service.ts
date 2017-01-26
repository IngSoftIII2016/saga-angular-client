import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Rol} from "../entities/rol";
import {Router} from "@angular/router";

@Injectable()
export class RolService extends GenericService<Rol> {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    protected valueToEntity(value: Object): Rol {
        return new Rol(value);
    }

    protected getResourcePath(): string {
        return 'roles';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions();
    }




}