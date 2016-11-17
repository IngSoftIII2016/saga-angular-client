import {Observable, BehaviorSubject} from "rxjs";
import {QueryOptions} from "./generic.service";
import {GenericService} from "./generic.service";
import {Entity} from "../entities/Entity";
/**
 * Created by juan on 15/11/16.
 */

export abstract class GenericStore<T extends Entity> {

    queryOptions : QueryOptions;

    items : BehaviorSubject<T>;

    protected abstract getService() : GenericService<T>
    

}