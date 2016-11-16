import {Observable} from "rxjs";
import {QueryOptions} from "./generic.service";
/**
 * Created by juan on 15/11/16.
 */

export abstract class GenericStore<T, S> {

    queryOptions : QueryOptions;

    items : Observable<T>;


}