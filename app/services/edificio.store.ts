import {EdificioService} from "./edificio.service";
import {Edificio} from "../entities/edificio";
import {GenericStore} from "./generic.store";
/**
 * Created by juan on 21/11/16.
 */
export class EdificioStore extends GenericStore<Edificio, EdificioService> {

    constructor(private edificioService: EdificioService) {
        super(edificioService);
    }

}