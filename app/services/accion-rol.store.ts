import {Injectable} from "@angular/core";
import {GenericStore} from "../commons/generic.store";
import {AccionRol} from "../entities/accion-rol";
import {AccionRolService} from "./accion-rol.service";
/**
 * Created by juan on 24/11/16.
 */
@Injectable()
export class AccionRolStore extends GenericStore<AccionRol, AccionRolService> {


    constructor(private accionRolService: AccionRolService) {
        super(accionRolService);
    }

}
