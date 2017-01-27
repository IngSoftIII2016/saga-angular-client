import {Injectable} from "@angular/core";
import {GenericStore} from "../commons/generic.store";
import {ParametrosService} from "./parametros.service";
import {Parametros} from "../entities/parametros";

@Injectable()
export class ParametrosStore extends GenericStore<Parametros, ParametrosService> {
    constructor(private parametrosService : ParametrosService) {
        super(parametrosService);
    }
}