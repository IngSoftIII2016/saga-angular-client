import {GenericStore} from "./generic.store";
import {SedeService} from "./sede.service";
import {Sede} from "../entities/sede";
import {Injectable} from "@angular/core";
/**
 * Created by juan on 18/11/16.
 */

@Injectable()
export class SedeStore extends GenericStore<Sede, SedeService> {

    constructor(public sedeService: SedeService) {
        super(sedeService);
    }


}