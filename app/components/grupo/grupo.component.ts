import {Component} from '@angular/core';
import {Grupo} from "../../entities/grupo";
import {GrupoService} from "../../services/grupo.service";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {GrupoStore} from "../../services/grupo.store";
import {CRUD} from "../../commons/crud";



@Component({
    templateUrl: 'app/components/grupo/grupo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'grupo',
    providers: [GrupoStore, ConfirmationService]
})
export class GrupoComponent extends CRUD<Grupo, GrupoService, GrupoStore>{


    constructor(private grupoStore: GrupoStore,  private confirmationService : ConfirmationService) {
        super(grupoStore, confirmationService);
    }


    protected getDefaultNewEntity(): Grupo {
        return new Grupo();
    }

    protected getEntityFromEvent(event: any): Grupo {
        return new Grupo(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'el rol ' + this.entity.nombre  ;
    }

    protected getSearchFields(): string[] {
        return ['nombre', 'descripcion']
    }


}
