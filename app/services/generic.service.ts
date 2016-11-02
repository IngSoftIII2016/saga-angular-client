///<reference path="../../node_modules/@angular/http/src/url_search_params.d.ts"/>
/**
 * Created by sandro on 20/10/2016.
 */

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Aula} from "../entities/aula";
import {Http, BaseRequestOptions, URLSearchParams, RequestOptions} from "@angular/http";
import {Edificio} from "../entities/edificio";

@Injectable()
export class GenericService {
    private url = 'app/';
    private options = new BaseRequestOptions();

    constructor(private http: Http) {
        //url = 'app/'+this.name;
    }

    
    getAll(): Promise<T[]> {
        return this.http
            .get(this.url)
            .toPromise()
            .then(res => res.json().data as T[])
            .catch(this.handleError);
    }

    getById(string: id): Promise<T> {
        return this.http
            .get(`${this.url}/id`)
            .toPromise()
            .then(res => res.json().data as T)
            .catch(this.handleError);
    }

	query(values : string[]) : Promise<T[]> {
        let params = new URLSearchParams();
        params.setAll(values);

        return this.http
            .get(this.url, { search: params })
            .toPromise()
            .then(res => res.json().data as T[])
            .catch(this.handleError);
    }
	
    add(T: obj) : Promise<T[]> {
        let body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(this.url,body,options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }



    update(T: obj) : Promise<T[]> {
        let body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .put(this.url,body,options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    delete(string : id) : Promise<T[]> {

        return this.http
            .delete(`${this.url}/id`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }



}
