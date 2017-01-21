import {Component} from '@angular/core';
import {Asignatura} from "../../entities/asignatura";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {AsignaturaStore} from "../../services/asignatura.store";
import {Subject} from "rxjs";
import {CALENDAR_LOCALE_ES} from "../../commons/calendar-locale-es";
import {AsignaturaService} from "../../services/asignatura.service";
import {CRUD} from "../../commons/crud";

@Component({
    templateUrl: 'app/components/asignatura/asignatura.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'asignatura',
    providers: [AsignaturaStore, ConfirmationService]
})
export class AsignaturaComponent  extends CRUD<Asignatura, AsignaturaService, AsignaturaStore> {

    constructor(private asignaturaStore: AsignaturaStore,  private confirmationService : ConfirmationService) {
        super(asignaturaStore, confirmationService);
    }

    protected getDefaultNewEntity(): Asignatura {
        return new Asignatura();
    }

   protected getEntityFromEvent(event: any): Asignatura {
        return new Asignatura(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'la asignatura ' + entity.nombre ;
    }

    protected getSearchFields(): string[] {
        return ['nombre']
    }



}	
