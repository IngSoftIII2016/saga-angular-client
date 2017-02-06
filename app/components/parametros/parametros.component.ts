import {Component} from '@angular/core';
import {Parametro} from '../../entities/parametros';
import {ParametrosStore} from "../../services/parametros.store";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {CRUD} from "../../commons/crud";
import {ParametrosService} from "../../services/parametros.service";
import {MessagesService} from "../../services/messages.service";

@Component({
	templateUrl: 'app/components/parametros/parametros.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'parametros',
	providers:[ParametrosStore, ConfirmationService]
})
export class ParametrosComponent extends CRUD<Parametro, ParametrosService, ParametrosStore>{


    constructor(private parametrosStore: ParametrosStore,
      messageService: MessagesService,
    private confirmationService: ConfirmationService) {
        super(parametrosStore, messageService, confirmationService); 
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected getDefaultNewEntity(): Parametro {
        return new Parametro();
    }

    protected getEntityFromEvent(event: any): Parametro {
        return new Parametro(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'el parámetro ' + entity.clave;
    }
    protected getEntityName(entity): string {
        return ' el parametro ' ;
    }

    protected getSearchFields(): string[] {
        return ['clave', 'valor', 'descripcion']
    }

}	
