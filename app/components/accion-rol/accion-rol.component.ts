/**
 * Created by juan on 24/11/16.
 */
import {Component} from '@angular/core';
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {AccionRol} from "../../entities/accion-rol";
import {AccionService} from "../../services/accion.service";
import {Accion} from "../../entities/accion";
import {Subject} from "rxjs";
import {RolService} from "../../services/rol.service";
import {Rol} from "../../entities/rol";
import {CRUD} from "../../commons/crud";
import {AccionRolService} from "../../services/accion-rol.service";
import {AccionRolStore} from "../../services/accion-rol.store";
import {MessagesService} from "../../services/messages.service";

@Component({
    templateUrl: 'app/components/accion-rol/accion-rol.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'accion-rol',
    providers: [AccionRolStore, ConfirmationService]
})
export class AccionRolComponent extends CRUD<AccionRol, AccionRolService, AccionRolStore> {

    roles: SelectItem[] = [];

    rol : Rol;

    acciones: SelectItem[] = [];

    metodoTabla = [];

    constructor(private accionRolStore: AccionRolStore,
                private accionService: AccionService,
                private rolService: RolService,
                messagesService: MessagesService,
                private confirmationService: ConfirmationService) {
        super(accionRolStore, messagesService, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        let self = this;
        this.rolService.getAll().subscribe(roles => {
            self.roles = roles.map(rol => {
                return { label: rol.nombre, value: rol}
            });
            self.rol = roles[0];
            self.filter('rol.id', self.rol.id);
        });
        this.accionService.getAll().subscribe(acciones => {
            self.acciones = acciones.map(accion => {
                    return { label: self.metodoTabla[accion.metodo] + ' de ' + accion.recurso, value: accion }
                }
            )
        });
        this.metodoTabla['GET'] = 'Consulta';
        this.metodoTabla['POST'] = 'Alta';
        this.metodoTabla['PUT'] = 'Modificación';
        this.metodoTabla['DELETE'] = 'Baja';
    }

    protected getDefaultNewEntity(): AccionRol {
        return new AccionRol();
    }

    protected getEntityFromEvent(event: any): AccionRol {
        return new AccionRol(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'la acción ' + this.metodoTabla[entity.accion.metodo] + ' al rol ' + entity.rol.nombre;
    }

    protected getSearchFields(): string[] {
        return ['accion.recurso']
    }

    onOpenDialog(entity: AccionRol) {
        entity.rol = this.rol;
    }


}