import {Component} from '@angular/core';
import {Sede} from '../../entities/sede';
import {SedeStore} from "../../services/sede.store";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {CRUD} from "../../commons/crud";
import {SedeService} from "../../services/sede.service";
import {MessagesService} from "../../services/messages.service";
import {TipoRecurso} from "../../entities/tipo-recurso";
import {TipoRecursoService} from "../../services/tipo-recurso.service";
import {TipoRecursoStore} from "../../services/tipo-recurso.store";

@Component({
	templateUrl: 'app/components/tipo-recurso/tipo-recurso.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'tiporecursos',
	providers:[TipoRecursoStore, ConfirmationService]
})
export class TipoRecursoComponent extends CRUD<TipoRecurso, TipoRecursoService, TipoRecursoStore>{


    constructor(private tipoStore: TipoRecursoStore,
                messagesService: MessagesService,
    private confirmationService: ConfirmationService) {
        super(tipoStore, messagesService, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected getDefaultNewEntity(): TipoRecurso {
        return new TipoRecurso();
    }

    protected getEntityFromEvent(event: any): TipoRecurso {
        return new TipoRecurso(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return ' el tipo de recurso ' + entity.nombre  ;
    }

    protected getEntityName(entity): string {
        return ' el tipo de recurso ' ;
    }

    protected getSearchFields(): string[] {
        return ['nombre']
    }

}	
