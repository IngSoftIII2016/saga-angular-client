import {Observable} from "rxjs";
import {RequestOptions, RequestMethod, Request, BaseRequestOptions, RequestOptionsArgs, Http} from "@angular/http";
/**
 * Created by juan on 12/11/16.
 */
export class QueryOptions {
    filters: Object[] = [];
    includes: string[] = [];
    sorts: Object[] = [];
    page: number = 1;
    size: number = 20;

    constructor(values : Object = {} ) {
        Object.assign(this, values);
    }

    nextPage() {

    }

}



export abstract class GenericService<T> {

    protected baseUrl: string = 'http://localhost/saga/api/';


    constructor(private http: Http) {
    }

    protected abstract getResourcePath() : string;

    protected getBaseRequestOptions() : RequestOptions {
        var reqOptions = new BaseRequestOptions();
        reqOptions.url = this.baseUrl + this.getResourcePath();
        reqOptions.headers.set('Content-Type', 'application/json');
        return reqOptions;
    }

    protected getQueryRequestOptions(queryOptions : QueryOptions) : RequestOptions {
        var reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Get;

        reqOptions.search.set('size', this.size.toString());
        reqOptions.search.set('page', this.page.toString());
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
        var req = new Request(reqOptions);
        return this.http.request(req).map(res => res.json().data as T[]);
    }

    public get()
}
