import {EdificioService} from "./edificio.service";
import {Edificio} from "../entities/edificio";
import {GenericStore} from "./generic.store";
import {Injectable} from "@angular/core";
/**
 * Created by juan on 21/11/16.
 */
@Injectable()
export class EdificioStore extends GenericStore<Edificio, EdificioService> {

    constructor(private edificioService: EdificioService) {
        super(edificioService);
    }

}