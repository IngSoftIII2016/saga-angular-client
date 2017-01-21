import {Component} from '@angular/core';
import {Message, ConfirmationService} from "primeng/components/common/api";
import {CRUD} from "../../commons/crud";
import {Rol} from "../../entities/rol";
import {RolService} from "../../services/rol.service";
import {RolStore} from "../../services/rol.store";

@Component({
    templateUrl: 'app/components/rol/rol.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'grupo',
    providers: [RolStore, ConfirmationService]
})
export class RolComponent extends CRUD<Rol, RolService, RolStore> {

    constructor(private rolStore: RolStore,  private confirmationService : ConfirmationService) {
        super(rolStore, confirmationService);
    }

    protected getDefaultNewEntity(): Rol {
        return new Rol();
    }

    protected getEntityFromEvent(event: any): Rol {
        return new Rol(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'el rol ' + entity.nombre  ;
    }

    protected getSearchFields(): string[] {
        return ['nombre', 'descripcion']
    }

}
