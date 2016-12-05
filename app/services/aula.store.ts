

import {Aula} from "../entities/aula";
import {AulaService} from "./aula.service";
import {Http} from "@angular/http";
import {GenericStore} from "../commons/generic.store";
import {QueryOptions} from "../commons/generic.service";
import {Injectable} from "@angular/core";
/**
 * Created by juan on 20/11/16.
 */
@Injectable()
export class AulaStore extends GenericStore<Aula, AulaService> {

    constructor(private aulaService: AulaService) {
        super(aulaService);
    }

}