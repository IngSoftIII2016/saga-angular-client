/**
 * Created by juan on 03/12/16.
 */

import {OnInit} from "@angular/core";
import {Entity} from "./entity";
import {GenericStore} from "./generic.store";
import {GenericService} from "./generic.service";
import {Subject} from "rxjs";

export abstract class CRUD<E extends Entity, SV extends GenericService<E>, ST extends GenericStore<E, SV>> implements OnInit {

    entity: E;

    store: ST;

    private searchTerms = new Subject<string>();

    constructor(store : ST) {
        this.store = store;
    }

    ngOnInit() {
        console.log("parent called");

        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.store.setLikes(terms.length > 0 ?
                    this.getSearchFields()
                        .map(like => {
                            let o;
                            o[like] = '*'+terms+'*';
                            return o}
                        ) : {}))

    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    protected abstract getSearchFields(): string[];

    protected abstract getDefaultNewEntity(): E;

}