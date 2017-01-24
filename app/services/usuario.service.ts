import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Usuario} from "../entities/usuario";
import {Router} from "@angular/router";

@Injectable()
export class UsuarioService extends GenericService<Usuario> {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    protected getResourcePath(): string {
        return 'usuarios';
    }

     public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions({
            includes : ['rol']
        });
    }

}