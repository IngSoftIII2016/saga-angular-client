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

@Component({
    templateUrl: 'app/components/accion-rol/accion-rol.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'accion-rol',
    providers: [AccionRolStore, AccionService,RolService, ConfirmationService]
})
export class AccionRolComponent extends CRUD<AccionRol, AccionRolService, AccionRolStore> {

    roles: SelectItem[] = [];

    acciones: SelectItem[] = [];

    metodoTabla = [];

    constructor(private accionRolStore: AccionRolStore,
                private accionService: AccionService,
                private rolService: RolService,
                private confirmationService: ConfirmationService) {
    super(accionRolStore, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        let self = this;

        this.rolService.getAll().subscribe(roles => {
            self.roles = roles.map(rol => {
                return { label: rol.nombre, value: rol}
            });
        });

        this.accionService.getAll().subscribe(acciones => {
            self.acciones = acciones.map(accion => {
                    return { label: self.metodoTabla[accion.metodo] + ' de ' + accion.recurso, value: accion }
                }
            )
        });

        self.metodoTabla['GET'] = 'Consulta';
        self.metodoTabla['POST'] = 'Alta';
        self.metodoTabla['PUT'] = 'Modificación';
        self.metodoTabla['DELETE'] = 'Baja';


    }

    protected getDefaultNewEntity(): AccionRol {
        return new AccionRol();
    }

    protected getEntityFromEvent(event: any): AccionRol {
        return new AccionRol(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'la acción ' + this.metodoTabla[this.entity.accion.metodo] + ' al rol ' + this.entity.rol.nombre;
    }

    protected getSearchFields(): string[] {
        return ['metodo', 'accion.url', 'accion.recurso']
    }

}