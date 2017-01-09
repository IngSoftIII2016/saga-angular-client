import {AccionService} from "./accion.service";
import {Accion} from "../entities/accion";
import {GenericStore} from "../commons/generic.store";
import {QueryOptions} from "../commons/generic.service";
import {Injectable} from "@angular/core";


@Injectable()
export class AccionStore extends GenericStore<Accion, AccionService> {

    constructor(private accionService: AccionService) {
        super(accionService);
    }

}
