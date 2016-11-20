import {Observable, BehaviorSubject, Subject} from "rxjs";
import 'rxjs/add/operator/do'
import {QueryOptions} from "./generic.service";
import {GenericService} from "./generic.service";
import {Entity} from "../entities/Entity";
/**
 * Created by juan on 15/11/16.
 */

export abstract class GenericStore<E extends Entity, S extends GenericService<E>> {

    public items : Observable<E[]>;
    public lastPage : Observable<number>;

    queryOptionsSub: BehaviorSubject<QueryOptions> = new BehaviorSubject(new QueryOptions());
    itemsSub : BehaviorSubject<E[]> = new BehaviorSubject([]);
    lastPageSub : BehaviorSubject<number> = new BehaviorSubject(0);

    private service: S;

    constructor(service : S) {
        this.service = service;
        this.queryOptionsSub
            .subscribe(qo => {
                this.service.query(qo)
                    .subscribe(items =>
                        this.itemsSub.next(items)
                    );
            });
        this.queryOptionsSub
            .map(qo => qo.size)
            .distinct()
            .subscribe(size =>
                this.service.totalRows
                    .subscribe(rows =>
                        this.lastPageSub.next(Math.ceil(rows / size))
                    )
            );


        this.items = this.itemsSub.asObservable();
        this.lastPage = this.lastPageSub.asObservable();
    }

  //  protected abstract getService(): S;

    public updateQueryOptions(options : Object = {}) {
        let qo = this.queryOptionsSub.getValue();
        qo.merge(options);
        this.queryOptionsSub.next(qo);
    }

    public gotoPage(page: number) : boolean {
        let qo = this.queryOptionsSub.getValue();
        let lastPage = this.lastPageSub.getValue();

        if(page > 0 && page <= lastPage) {
            qo.page = page;
            this.queryOptionsSub.next(qo);
            return true;
        }else return false;
    }

    public nextPage() : boolean{
        let qo = this.queryOptionsSub.getValue();
        let lastPage = this.lastPageSub.getValue();
        if(qo.page >= lastPage) return false;
        this.lastPageSub.next(qo.page++);
    }

    public prevPage() : boolean{
        let qo = this.queryOptionsSub.getValue();
        let lastPage = this.lastPageSub.getValue();
        if(qo.page = 0) return false;
        this.lastPageSub.next(qo.page--);
    }

    public save(entity : E) : Observable<E> {
        return entity.id ? this.update(entity) : this.create(entity);
    }

    public create(entity : E) : Observable<E> {
        return this.service.create(entity)
            .do(nuevo => this.updateItems());

    }

    public update(entity : E) : Observable<E> {
        return this.service.update(entity)
            .do(modificado => this.updateItems());
    }

    public delete(entity : E) : Observable<E> {
        return this.service.delete(entity)
            .do(borrado => this.updateItems());
    }

    private updateItems() {
        this.queryOptionsSub.next(this.queryOptionsSub.getValue());

    }

}