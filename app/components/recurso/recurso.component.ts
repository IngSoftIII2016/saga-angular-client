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
import {AulaService} from "../../services/aula.service";
import {MessagesService} from "../../services/messages.service";
import {RecursoStore} from "../../services/recurso.store";
import {RecursoService} from "../../services/recurso.service";
import {Recurso} from "../../entities/recurso";
import {TipoRecursoService} from "../../services/tipo-recurso.service";
import {TipoRecurso} from "../../entities/tipo-recurso";


@Component({
    templateUrl: 'app/components/recurso/recurso.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'recurso',
    providers: [RecursoStore, RecursoService, ConfirmationService]
})
export class RecursoComponent extends CRUD<Recurso, RecursoService, RecursoStore> {

    tipo: SelectItem[] = [];
    aula: SelectItem[] = [];
    disponibleTabla = [];

    constructor(private recursoStore: RecursoStore,
                private tipoService: TipoRecursoService,
                private aulaService: AulaService,
                messagesService: MessagesService,
                private confirmationService: ConfirmationService) {
        super(recursoStore, messagesService, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        var sel = this;
        this.disponibleTabla['0'] = 'NO';
        this.disponibleTabla['1'] = 'SI';


            this.tipoService.getAll().subscribe(tipo => {
                sel.tipo= tipo.map(tipo => {
                        return { label: tipo.nombre , value: tipo}
                    }
                )
            });

            this.aulaService.getAll().subscribe(aula => {
                sel.aula= aula.map(aula => {
                        return { label: aula.nombre , value: aula}
                    }
                )
            });

    }

    protected getDefaultNewEntity(): Recurso {

        return new Recurso({
            tipo_recurso: this.tipo[0].value as TipoRecurso,
            aula : this.aula[0].value as Aula,
            disponible : true
        });
    }

    protected getEntityFromEvent(event: any): Recurso {
        return new Recurso(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'el recurso ' + entity.nombre ;
    }
    protected getEntityName(entity): string {
        return ' el recurso ' ;
    }

    protected getSearchFields(): string[] {
        return ['nombre' , 'tipo_recurso', 'aula.nombre']
    }

}
