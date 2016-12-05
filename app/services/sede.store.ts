import {GenericStore} from "../commons/generic.store";
import {SedeService} from "./sede.service";
import {Sede} from "../entities/sede";
import {Injectable} from "@angular/core";
import {QueryOptions} from "../commons/generic.service";
/**
 * Created by juan on 18/11/16.
 */

@Injectable()
export class SedeStore extends GenericStore<Sede, SedeService> {

    constructor(private sedeService: SedeService) {
        super(sedeService);
    }

}