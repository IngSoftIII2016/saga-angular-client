import {Injectable} from "@angular/core";
import {GenericStore} from "../commons/generic.store";
import {AsignaturaCarrera} from "../entities/asignatura-carrera";
import {AsignaturaCarreraService} from "./asignatura-carrera.service";
/**
 * Created by juan on 24/11/16.
 */
@Injectable()
export class AsignaturaCarreraStore extends GenericStore<AsignaturaCarrera, AsignaturaCarreraService> {

    constructor(private asignaturaCarreraService: AsignaturaCarreraService) {
        super(asignaturaCarreraService);
    }

}
