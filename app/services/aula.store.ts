

import {Aula} from "../entities/aula";
import {AulaService} from "./aula.service";
import {Http} from "@angular/http";
import {GenericStore} from "./generic.store";
import {QueryOptions} from "./generic.service";
/**
 * Created by juan on 20/11/16.
 */
export class AulaStore extends GenericStore<Aula, AulaService> {

    constructor(private aulaService: AulaService) {
        super(aulaService);
    }
    protected getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions(
            {
                inclues: ['edificio'],
                sorts: ['edificio.id', 'nombre']
            })
    }
}