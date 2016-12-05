import {Injectable} from "@angular/core";
import {GenericStore} from "../commons/generic.store";
import {Horario} from "../entities/horario";
import {HorarioService} from "./horario.service";
@Injectable()
export class HorarioStore extends GenericStore<Horario, HorarioService> {
    constructor(private horarioService: HorarioService) {
        super(horarioService);
    }
}/**
 * Created by Federico on 29/11/2016.
 */
