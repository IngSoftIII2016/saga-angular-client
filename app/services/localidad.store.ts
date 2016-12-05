/**
 * Created by juan on 21/11/16.
 */
import {Injectable} from "@angular/core";
import {GenericStore} from "../commons/generic.store";
import {LocalidadService} from "./localidad.service";
import {Localidad} from "../entities/localidad";
@Injectable()
export class LocalidadStore extends GenericStore<Localidad, LocalidadService> {
    constructor(private localidadService : LocalidadService) {
        super(localidadService);
    }
}