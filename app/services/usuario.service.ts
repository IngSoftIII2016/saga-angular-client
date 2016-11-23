import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "./generic.service";
import {Usuario} from "../entities/usuario";

@Injectable()
export class UsuarioService extends GenericService<Usuario> {

    constructor(http: Http) {
        super(http);
    }

    protected getResourcePath(): string {
        return 'usuarios';
    }

    public getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions();
    }

}