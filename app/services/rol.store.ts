import {RolService} from "./rol.service";
import {Rol} from "../entities/rol";
import {GenericStore} from "../commons/generic.store";
import {QueryOptions} from "../commons/generic.service";
import {Injectable} from "@angular/core";


@Injectable()
export class RolStore extends GenericStore<Rol, RolService> {

    constructor(private rolService: RolService) {
        super(rolService);
    }

}
