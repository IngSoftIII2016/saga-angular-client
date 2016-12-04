import {Observable, BehaviorSubject, Subject} from "rxjs";
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/zip'
import {QueryOptions} from "./generic.service";
import {GenericService} from "./generic.service";
import {Entity} from "../entities/entity";
/**
 * Created by juan on 15/11/16.
 */

export abstract class GenericStore<E extends Entity, S extends GenericService<E>> {

    public items: Observable<E[]>;

    queryOptions: BehaviorSubject<QueryOptions>;

    public service: S;

    constructor(service: S) {
        this.service = service;

        this.queryOptions = new BehaviorSubject(this.service.getDefaultQueryOptions());

        this.items = this.queryOptions
            .flatMap(qo => this.service.query(qo));

    }

    private updateItems() {
        this.queryOptions.next(this.queryOptions.getValue());

    }

    public mergeQueryOptions(options: Object = {}) {
        let qo = this.queryOptions.getValue();
        qo.merge(options);
        //console.log(qo);
        this.setQueryOptions(qo);
    }

    public create(entity: E): Observable<E> {
        return this.service.create(entity)
            .do(nuevo => this.updateItems());
    }

    public save(entity: E): Observable<E> {
        return entity.id ? this.update(entity) : this.create(entity);
    }

    public update(entity: E): Observable<E> {
        return this.service.update(entity)
            .do(modificado => this.updateItems());
    }

    public delete(entity: E): Observable<E> {
        return this.service.delete(entity)
            .do(borrado => this.updateItems());
    }

    public getQueryOptions() : QueryOptions {
        return this.queryOptions.getValue();
    }

    public setQueryOptions(qo: QueryOptions = this.service.getDefaultQueryOptions()) {
        this.queryOptions.next(qo);
    }

    public getFilters() : Object {
        return this.getQueryOptions().filters;
    }

    public setFilters(filters: Object = {}) {
        this.mergeQueryOptions({filters : filters });
    }

    public getSorts() : Object[] {
        return this.getQueryOptions().sorts;
    }

    public setSorts(sorts: Object[] = []) {
        this.mergeQueryOptions({ sorts : sorts});
    }

    public getIncludes() : string[] {
        return this.getQueryOptions().includes;
    }

    public setIncludes(includes: string[] = []) {
        this.mergeQueryOptions({ includes : includes});
    }

    public getLikes() : Object {
        return this.getQueryOptions().likes;
    }

    public setLikes(likes: Object) {
        this.mergeQueryOptions({ likes: likes });
    }

    public getSize() : number {
        return this.getQueryOptions().size;
    }

    public setSize(size : number) {
        this.mergeQueryOptions({ size : size});
    }

    public getPage() : number {
        return this.getQueryOptions().page;
    }

    public setPage(page: number) {
        this.mergeQueryOptions({ page : page});
    }
}