/**
 * Created by juan on 21/11/16.
 */
import {Injectable} from "@angular/core";
import {GenericStore} from "./generic.store";
import {Docente} from "../entities/docente";
import {DocenteService} from "./docente.service";
@Injectable()
export class DocenteStore extends GenericStore<Docente, DocenteService> {
    constructor(private docenteService: DocenteService) {
        super(docenteService);
    }
}