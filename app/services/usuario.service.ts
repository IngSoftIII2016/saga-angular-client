import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Usuario} from "../entities/usuario";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class UsuarioService extends GenericService<Usuario> {

    constructor(http: Http, auth: AuthenticationService) {
        super(http, auth);
    }
    protected valueToEntity(value: Object): Usuario {
        return new Usuario(value);
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