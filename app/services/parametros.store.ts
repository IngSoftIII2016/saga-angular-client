import {Injectable} from "@angular/core";
import {GenericStore} from "../commons/generic.store";
import {ParametrosService} from "./parametros.service";
import {Parametro} from "../entities/parametros";

@Injectable()
export class ParametrosStore extends GenericStore<Parametro, ParametrosService> {
    constructor(private parametrosService : ParametrosService) {
        super(parametrosService);
    }
}