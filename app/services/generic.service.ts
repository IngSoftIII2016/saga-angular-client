import {Observable, BehaviorSubject} from "rxjs";
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
    likes: Object[] = [];
    page: number = 1;
    size: number = 10;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    merge(values: Object = {}) {
        Object.assign(this, values);
    }
}


@Injectable()
export abstract class GenericService<T extends Entity> {

    public totalRows: Observable<number>;

    protected baseUrl: string = 'http://localhost/saga/api/';

    private rowCount: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(protected http: Http) {
        this.getRowsCount()
            .subscribe(rows =>
                    this.rowCount = new BehaviorSubject<number>(rows),
                err => console.error(err)
            );
        this.totalRows = this.rowCount.asObservable();
    }

    protected abstract getResourcePath(): string;


    public query(queryOptions: QueryOptions): Observable<T[]> {
        let reqOptions = this.getQueryRequestOptions(queryOptions);
        reqOptions.url = this.baseUrl + this.getResourcePath();
        let req = new Request(reqOptions);
        let obs = this.http.request(req).map(res => res.json());
        obs.do(json => this.rowCount.next(json.rowCount));
        return obs.map(json => json.data);
    }

    private getRowsCount(): Observable<number> {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.url += '/0';
        let req = new Request(reqOptions);
        return this.http.request(req).map(res => res.json().data as number);
    }

    public create(t: T): Observable<T> {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Post;
        reqOptions.body = JSON.stringify({data: t});
        let req = new Request(reqOptions);
        console.log(req);
        return this.http.request(req).map(res => res.json().data as T);
    }

    public update(t: T): Observable<T> {

        let reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Put;
        reqOptions.body = JSON.stringify({data: t});
        let req = new Request(reqOptions);
        return this.http.request(req).map(res => res.json().data as T);
    }

    public delete(t: T): Observable<T> {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.url += '/' + t.id;
        reqOptions.method = RequestMethod.Delete;
        let req = new Request(reqOptions);
        return this.http.request(req).map(res => res.json().data as T);
    }

    protected getBaseRequestOptions(): RequestOptions {
        let reqOptions = new BaseRequestOptions();
        reqOptions.url = this.baseUrl + this.getResourcePath();
        reqOptions.headers.set('Content-Type', 'application/json');
        reqOptions.search = new URLSearchParams();
        return reqOptions;
    }

    protected getQueryRequestOptions(queryOptions: QueryOptions): RequestOptions {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Get;
        reqOptions.search.set('size', queryOptions.size.toString());
        reqOptions.search.set('page', queryOptions.page.toString());
        for (let key in queryOptions.filters)
            if (queryOptions.filters.hasOwnProperty(key))
                reqOptions.search.set(key, queryOptions.filters[key].toString());
        if (queryOptions.includes.length > 0)
            reqOptions.search.set('include', queryOptions.includes.join(','));
        for (let key in queryOptions.sorts)
            if (queryOptions.sorts.hasOwnProperty(key))
                reqOptions.search.set('sort', queryOptions.sorts.join(','));
        for (let key in queryOptions.likes)
            if (queryOptions.likes.hasOwnProperty(key))
                reqOptions.search.set('like', queryOptions.sorts.join(','));

        return reqOptions;
    }
}
