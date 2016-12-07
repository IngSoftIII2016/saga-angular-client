import {Component, Inject} from '@angular/core';
import {Asignatura} from "../../entities/asignatura";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {AsignaturaStore} from "../../services/asignatura.store";
import {Subject} from "rxjs";
import {CRUD} from "../../commons/crud";
import {AsignaturaService} from "../../services/asignatura.service";

@Component({
    templateUrl: 'app/components/composite-asignatura/composite-asignatura.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'asignatura',
    providers: [AsignaturaStore, ConfirmationService]
})
export class CompositeAsignaturaComponent extends CRUD<Asignatura, AsignaturaService, AsignaturaStore> {

    constructor(@Inject(AsignaturaStore) store: AsignaturaStore,
                private confirmationService: ConfirmationService) {
        super(store, confirmationService);
    }

    protected getSearchFields(): string[] {
        return ['nombre'];
    }

    protected getEntityReferencedLabel(): string {
        return 'la asignatura ' + this.entity.nombre;
    }

    protected getDefaultNewEntity(): Asignatura {
        return new Asignatura();
    }

    protected getEntityFromEvent(event: any): Asignatura {
        return new Asignatura(event.data)
    }

    protected validate(asignatura: Asignatura): Message[] {
        if (!asignatura.nombre)
            return [{
                severity: 'error',
                summary: 'Error',
                detail: 'Complete los campos requeridos'
            }];
        return super.validate(asignatura);
    }

}	
