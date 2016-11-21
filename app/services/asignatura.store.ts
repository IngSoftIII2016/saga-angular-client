import {AsignaturaService} from "./asignatura.service";
import {Asignatura} from "../entities/asignatura";
import {GenericStore} from "./generic.store";
import {QueryOptions} from "./generic.service";
import {Injectable} from "@angular/core";
/**
 * Created by juan on 20/11/16.
 */
@Injectable()
export class AsignaturaStore extends GenericStore<Asignatura, AsignaturaService> {

    constructor(private asignaturaService: AsignaturaService) {
        super(asignaturaService);
    }

}
