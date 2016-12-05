/**
 * Created by juan on 21/11/16.
 */
import {Injectable} from "@angular/core";
import {GenericStore} from "../commons/generic.store";
import {Evento} from "../entities/evento";
import {EventoService} from "./evento.service";
@Injectable()
export class EventoStore extends GenericStore<Evento, EventoService> {

    constructor(private eventoService : EventoService) {
        super(eventoService);
    }
}