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

    metodos: SelectItem[] = [];

    metodoTabla = new Array();

    metodoSelected: string;

    constructor(private accionRolStore: AccionRolStore,
                private accionService: AccionService,
                private rolService: RolService,
                private confirmationService: ConfirmationService) {
    super(accionRolStore, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        var sel = this;

        this.rolService.getAll().subscribe(roles => {
            sel.roles= roles.map(rol => {
                return { label: rol.nombre, value: rol}
            }
            )
        });




        sel.metodos.push({label: 'Lectura', value: 'GET'});
        sel.metodos.push({label: 'Escritura', value: 'POST'});
        sel.metodos.push({label: 'Modificacíon', value: 'PUT'});
        sel.metodos.push({label: 'Eliminacíon', value: 'DELETE'});

        sel.metodoTabla['GET'] = 'Lectura';
        sel.metodoTabla['POST'] = 'Escritura';
        sel.metodoTabla['PUT'] = 'Modificacíon';
        sel.metodoTabla['DELETE'] = 'Eliminacíon';

        this.accionService.getAll().subscribe(acciones => {
            this.acciones = acciones.map(accion => {
                    return { label: sel.metodoTabla[accion.metodo] + ' ' + accion.recurso, value: accion }
                }
            )
        });

    }


    protected getDefaultNewEntity(): AccionRol {
        return new AccionRol({
            accion: this.acciones[0].value as Accion,
            rol: this.roles[0].value as Rol
        });
    }

    protected getEntityFromEvent(event: any): AccionRol {
        return new AccionRol(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'el Rol ' + this.entity.rol.nombre + ' para la Accíon ' + this.entity.accion.metodo;
    }

    protected getSearchFields(): string[] {
        return ['rol.nombre', 'metodo', 'accion.url', 'accion.recurso']
    }

}