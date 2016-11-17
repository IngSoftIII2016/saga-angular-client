import {Observable} from "rxjs";
import {
    RequestOptions, RequestMethod, Request, BaseRequestOptions, RequestOptionsArgs, Http,
    URLSearchParams
} from "@angular/http";
import {Inject, Injectable} from "@angular/core";
import {Entity} from "../entities/Entity";
/**
 * Created by juan on 12/11/16.
 */

export class QueryOptions {
    filters: Object[] = [];
    includes: string[] = [];
    sorts: Object[] = [];
    page: number = 1;
    size: number = 10;

    constructor(values : Object = {} ) {
        Object.assign(this, values);
    }
}


@Injectable()
export abstract class GenericService<T extends Entity> {

    protected baseUrl: string = 'http://localhost/saga/api/';

    constructor(protected http: Http) {

    }

    protected abstract getResourcePath() : string;

    protected  abstract  getInclude() : string

    protected getBaseRequestOptions() : RequestOptions {
        var reqOptions = new BaseRequestOptions();
        reqOptions.url = this.baseUrl + this.getResourcePath() ;
        reqOptions.headers.set('Content-Type', 'application/json');
        reqOptions.search = new URLSearchParams();
        return reqOptions;
    }

    protected getQueryRequestOptions(queryOptions : QueryOptions) : RequestOptions {
        var reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Get;
        reqOptions.search.set('size', queryOptions.size.toString());
        reqOptions.search.set('page', queryOptions.page.toString());
        for(var key in queryOptions.filters)
            if (queryOptions.filters.hasOwnProperty(key))
                reqOptions.search.set(key, queryOptions.filters[key].toString());
        if(queryOptions.includes.length > 0)
            reqOptions.search.set('include', queryOptions.includes.join(','));
        for(var key in queryOptions.sorts)
            if (queryOptions.sorts.hasOwnProperty(key))
                reqOptions.search.set(key, queryOptions.sorts.join(','));

        return reqOptions;
    }

    public query(queryOptions: QueryOptions) : Observable<T[]>{
        var reqOptions = this.getQueryRequestOptions(queryOptions);
        reqOptions.url =  this.baseUrl + this.getResourcePath() + this.getInclude();
        var req = new Request(reqOptions);
        return this.http.request(req).map(res => res.json().data as T[]);
    }

    public create(t : T) : Observable<T> {

        var reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Post;
        reqOptions.body = JSON.stringify( {data : t} );
        var req = new Request(reqOptions);
        return this.http.request(req).map(res => res.json().data as T);
    }

    public update(t : T) : Observable<T> {

        var reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Put;
        reqOptions.body = JSON.stringify( {data : t} );
        var req = new Request(reqOptions);
        return this.http.request(req).map(res => res.json().data as T);
    }

    public delete(t : T) : Observable<T> {

        var reqOptions = this.getBaseRequestOptions();
        reqOptions.url += '/' + t.id;
        reqOptions.method = RequestMethod.Delete;
        var req = new Request(reqOptions);
        return this.http.request(req).map(res => res.json().data as T);
    }
}
