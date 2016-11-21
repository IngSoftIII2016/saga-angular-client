

import {Aula} from "../entities/aula";
import {AulaService} from "./aula.service";
import {Http} from "@angular/http";
import {GenericStore} from "./generic.store";
import {QueryOptions} from "./generic.service";
import {Injectable} from "@angular/core";
/**
 * Created by juan on 20/11/16.
 */
@Injectable()
export class AulaStore extends GenericStore<Aula, AulaService> {

    constructor(private aulaService: AulaService) {
        super(aulaService);
    }
    protected getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions(
            {
                includes: ['edificio'],
                sorts: [
                    {field : 'edificio.id', order: 1},
                    {field : 'nombre', order : 1}]
            })
    }
}