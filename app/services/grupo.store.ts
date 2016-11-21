/**
 * Created by juan on 21/11/16.
 */
import {Injectable} from "@angular/core";
import {GenericStore} from "./generic.store";
import {Grupo} from "../entities/grupo";
import {GrupoService} from "./grupo.service";
@Injectable()
export class GrupoStore extends GenericStore<Grupo, GrupoService> {
    constructor(private grupoService: GrupoService) {
        super(grupoService);
    }
}