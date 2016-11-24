import {GenericService} from "./generic.service";
import {Entity} from "../entities/entity";
import {Observable} from "rxjs";
import {RequestMethod, Request, Http} from "@angular/http";
/**
 * Created by juan on 24/11/16.
 */
export abstract class RelationService<T extends Entity> extends GenericService<T> {

    constructor(http: Http) {
        super(http);
    }

    public delete(t: T): Observable<T> {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Delete;
        reqOptions.body =  JSON.stringify({data: t});
        let req = new Request(reqOptions);
        return this.http.request(req).map(res => res.json().data as T);
    }
}