/**
 * Created by juan on 21/11/16.
 */
import {Injectable} from "@angular/core";
import {GenericStore} from "../commons/generic.store";
import {Carrera} from "../entities/carrera";
import {CarreraService} from "./carrera.service";
@Injectable()
export class CarreraStore extends GenericStore<Carrera, CarreraService> {

    constructor(private carreraService : CarreraService) {
        super(carreraService);
    }
}