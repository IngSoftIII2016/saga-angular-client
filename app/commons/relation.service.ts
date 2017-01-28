import {GenericService} from "./generic.service";
import {Entity} from "./entity";
import {Observable} from "rxjs";
import {RequestMethod, Request, Http} from "@angular/http";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
/**
 * Created by juan on 24/11/16.
 */
export abstract class RelationService<T extends Entity> extends GenericService<T> {

    constructor(http: Http, auth: AuthenticationService) {
        super(http, auth);
    }

    public delete(t: T): Observable<T> {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Delete;
        reqOptions.body =  JSON.stringify({data: t});
        let req = new Request(reqOptions);
        return this.intercept(this.http.request(req))
            .map(res => this.valueToEntity(res.json().data));
    }
}