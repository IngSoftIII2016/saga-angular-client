/**
 * Created by juan on 21/11/16.
 */
import {Injectable} from "@angular/core";
import {GenericStore} from "./generic.store";
import {Periodo} from "../entities/periodo";
import {PeriodoService} from "./periodo.service";
@Injectable()
export class PeriodoStore extends GenericStore<Periodo, PeriodoService> {
    constructor(private periodoService: PeriodoService) {
        super(periodoService);
    }
}