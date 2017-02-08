import {Injectable} from "@angular/core";
import {GenericStore} from "../commons/generic.store";
import {Horario} from "../entities/horario";
import {HorarioService} from "./horario.service";
import {Recurso} from "../entities/recurso";
import {RecursoService} from "./recurso.service";
import {TipoRecurso} from "../entities/tipo-recurso";
import {TipoRecursoService} from "./tipo-recurso.service";
@Injectable()
export class TipoRecursoStore extends GenericStore<TipoRecurso, TipoRecursoService> {
    constructor(private tiporecursoService: TipoRecursoService) {
        super(tiporecursoService);
    }
}