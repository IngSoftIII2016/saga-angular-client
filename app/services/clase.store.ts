/**
 * Created by juan on 21/11/16.
 */
import {Injectable} from "@angular/core";
import {GenericStore} from "./generic.store";
import {Clase} from "../entities/clase";
import {ClaseService} from "./clase.service";
@Injectable()
export class ClaseStore extends GenericStore<Clase, ClaseService> {
    constructor(private claseService: ClaseService) {
        super(claseService);
    }
}