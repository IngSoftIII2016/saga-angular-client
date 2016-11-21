import {AsignaturaService} from "./asignatura.service";
import {Asignatura} from "../entities/asignatura";
import {GenericStore} from "./generic.store";
import {QueryOptions} from "./generic.service";
/**
 * Created by juan on 20/11/16.
 */
export class AsignaturaStore extends GenericStore<Asignatura, AsignaturaService> {

    constructor(private asignaturaService: AsignaturaService) {
        super(asignaturaService);
    }

    protected getDefaultQueryOptions() : QueryOptions {
        return new QueryOptions({});
    }



}
