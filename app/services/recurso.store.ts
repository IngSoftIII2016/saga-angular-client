import {Injectable} from "@angular/core";
import {GenericStore} from "../commons/generic.store";
import {Horario} from "../entities/horario";
import {HorarioService} from "./horario.service";
import {Recurso} from "../entities/recurso";
import {RecursoService} from "./recurso.service";
@Injectable()
export class RecursoStore extends GenericStore<Recurso, RecursoService> {
    constructor(private recursoService: RecursoService) {
        super(recursoService);
    }
}