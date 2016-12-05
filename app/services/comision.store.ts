/**
 * Created by juan on 21/11/16.
 */
import {Injectable} from "@angular/core";
import {GenericStore} from "../commons/generic.store";
import {Comision} from "../entities/comision";
import {ComisionService} from "./comision.service";
@Injectable()
export class ComisionStore extends GenericStore<Comision, ComisionService> {
    constructor(private comisionService: ComisionService) {
        super(comisionService);
    }
}