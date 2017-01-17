import {Component} from '@angular/core';
import {Aula} from "../../entities/aula";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {AulaStore} from "../../services/aula.store";
import {EdificioService} from "../../services/edificio.service";
import {Edificio} from "../../entities/edificio";
import {Observable, Subject} from "rxjs";
import {forEach} from "@angular/router/src/utils/collection";
import {QueryOptions} from "../../commons/generic.service";
import {CRUD} from "../../commons/crud";

import {Accion} from "../../entities/accion";
import {AccionService} from "../../services/accion.service";
import {AccionStore} from "../../services/accion.store";

@Component({
    templateUrl: 'app/components/accion/accion.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'accion',
    providers: [AccionStore, ConfirmationService]
})

export class AccionComponent extends CRUD<Accion, AccionService, AccionStore> {


    metodos: SelectItem[] = [];
    metodoTabla = new Array();


    constructor(private accionStore: AccionStore,
                private confirmationService: ConfirmationService) {
        super(accionStore,confirmationService);
        super.ngOnInit();
        var sel = this;

    sel.metodos.push({label: 'Lectura', value: 'GET'});
    sel.metodos.push({label: 'Escritura', value: 'POST'});
    sel.metodos.push({label: 'Modificacíon', value: 'PUT'});
    sel.metodos.push({label: 'Eliminacíon', value: 'DELETE'});

    sel.metodoTabla['GET'] = 'Lectura';
    sel.metodoTabla['POST'] = 'Escritura';
    sel.metodoTabla['PUT'] = 'Modificacíon';
    sel.metodoTabla['DELETE'] = 'Eliminacíon';

    }

    protected getDefaultNewEntity(): Accion {
        return new Accion();
    }

    protected getEntityFromEvent(event: any): Accion {
        return new Accion(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'la accion ' + this.entity.metodo + " " + this.entity.recurso ;
    }

    protected getSearchFields(): string[] {
        return ['recurso' , 'metodo']
    }


}
/**
 * Created by Federico on 17/11/2016.
 */
