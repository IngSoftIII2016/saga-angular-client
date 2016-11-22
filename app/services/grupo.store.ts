import {GrupoService} from "./grupo.service";
import {Grupo} from "../entities/grupo";
import {GenericStore} from "./generic.store";
import {QueryOptions} from "./generic.service";
import {Injectable} from "@angular/core";
/**
 * Created by juan on 20/11/16.
 */
@Injectable()
export class GrupoStore extends GenericStore<Grupo, GrupoService> {

    constructor(private grupoService: GrupoService) {
        super(grupoService);
    }

}
