import {Observable, BehaviorSubject} from "rxjs";
import {
    RequestOptions, RequestMethod, Request, BaseRequestOptions, RequestOptionsArgs, Http,
    URLSearchParams, Response
} from "@angular/http";
import {Inject, Injectable} from "@angular/core";
import {Entity} from "./entity";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";


/**
 * Created by juan on 12/11/16.
 */

export class QueryOptions {
    includes: string[] = [];
    filters: Object = {};
    likes: Object = {};
    sorts: Object[] = [];
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

    constructor(protected http: Http, protected authService: AuthenticationService) {
        this.totalRows = this.rowCount.asObservable().distinctUntilChanged();
    }

    protected abstract valueToEntity(value: Object): T;

    protected abstract getResourcePath(): string;

    public abstract getDefaultQueryOptions() : QueryOptions;

    public query(queryOptions: QueryOptions = this.getDefaultQueryOptions()): Observable<T[]> {
        let reqOptions = this.getQueryRequestOptions(queryOptions);
        reqOptions.url = this.baseUrl + this.getResourcePath();
        let req = new Request(reqOptions);
        return this.intercept(this.http.request(req))
            .map(res => res.json())
            .do(json => this.rowCount.next(json.rowCount))
            .map(json => json.data.map(t => this.valueToEntity(t)));
    }

    public getAll(qo : QueryOptions = this.getDefaultQueryOptions()) : Observable<T[]> {
        qo.merge({page : -1});
        return this.query(qo);
    }

    public get(id : number, qo : QueryOptions = this.getDefaultQueryOptions()) : Observable<T> {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Get;
        reqOptions.url += '/' + id.toString();
        let req = new Request(reqOptions);
        return this.intercept(this.http.request(req)).map(res => this.valueToEntity(res.json().data));
    }

    private getRowsCount(): Observable<number> {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.url += '/0';
        let req = new Request(reqOptions);
        return this.intercept(this.http.request(req)).map(res => res.json().data as number);
    }

    public create(t: T): Observable<T> {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Post;
        reqOptions.body = JSON.stringify({data: t});
        let req = new Request(reqOptions);
        return this.intercept(this.http.request(req)).map(res => this.valueToEntity(res.json().data));
    }

    public update(t: T): Observable<T> {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.method = RequestMethod.Put;
        reqOptions.body = JSON.stringify({data: t});
        let req = new Request(reqOptions);
        return this.intercept(this.http.request(req)).map(res => this.valueToEntity(res.json().data));
    }

    public delete(t: T): Observable<T> {
        let reqOptions = this.getBaseRequestOptions();
        reqOptions.url += '/' + t.id;
        reqOptions.method = RequestMethod.Delete;
        let req = new Request(reqOptions);
        return this.intercept(this.http.request(req)).map(res => this.valueToEntity(res.json().data));
    }

    protected getBaseRequestOptions(): RequestOptions {
        let reqOptions = new BaseRequestOptions();
        reqOptions.url = this.baseUrl + this.getResourcePath();
        reqOptions.headers.set('Content-Type', 'application/json');
        reqOptions.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
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
                reqOptions.search.set(key, queryOptions.filters[key] + '');

        if (queryOptions.includes.length > 0)
            reqOptions.search.set('include', queryOptions.includes.join(','));

        if (queryOptions.sorts.length > 0) {
            let sorts: string[] = [];
            for (let key in queryOptions.sorts) {
                let sortOrder: number = queryOptions.sorts[key]['order'];
                let sortField = queryOptions.sorts[key]['field'];
                if (sortOrder < 0)
                    sortField = '-' + sortField;
                sorts.push(sortField)
            }
            reqOptions.search.set('sort', sorts.join(','));
        }

        let likes: string[] = [];
        for (let key in queryOptions.likes)
            if (queryOptions.likes.hasOwnProperty(key)) {
                let likeValue = queryOptions.likes[key];
                let likeField = key.toString();
                likes.push(likeField + ':' + likeValue);
            }
        if (likes.length > 0)
            reqOptions.search.set('like', likes.join(','));

        return reqOptions;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status  == 401 ) {
                this.authService.refreshToken();
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });

    }
}
