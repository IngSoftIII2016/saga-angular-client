import {Injectable} from '@angular/core';
import {Http, Response, RequestMethod, Request} from '@angular/http';

import 'rxjs/add/operator/map'
import {GenericService, QueryOptions} from "../commons/generic.service";
import {Usuario} from "../entities/usuario";
import {Observable} from "rxjs";
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

    public change_password(email, oldpass , newpass): Observable<boolean> {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Post;
        reqOptions.url = 'http://localhost/saga/api/AuthEndpoint/change_pass';
        reqOptions.body = JSON.stringify({'data':{ 'email': email,
            'oldpassword' : oldpass, 'newpassword' : newpass}});
        let req = new Request(reqOptions)
        return this.intercept(this.http.request(req)).map(res =>true)
    }


}