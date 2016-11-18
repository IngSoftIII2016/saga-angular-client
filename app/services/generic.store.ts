import {Observable, BehaviorSubject, Subject} from "rxjs";
import {QueryOptions} from "./generic.service";
import {GenericService} from "./generic.service";
import {Entity} from "../entities/Entity";
/**
 * Created by juan on 15/11/16.
 */

export abstract class GenericStore<E extends Entity, S extends GenericService<E>> {

    queryOptionsSubject : Subject<QueryOptions>;

    queryOptions : QueryOptions;

    items : Observable<E[]>;

    lastPage : number;

    constructor() {
        this.queryOptionsSubject.subscribe(qo => {
            this.queryOptions = qo;
            this.items = this.getService().query(qo);
        })
    }

    protected abstract getService() : S;

    public gotoPage(page: number) {

    }

    

}