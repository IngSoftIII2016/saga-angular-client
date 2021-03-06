import {Component} from '@angular/core';
import {Sede} from '../../entities/sede';
import {SedeStore} from "../../services/sede.store";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {CRUD} from "../../commons/crud";
import {SedeService} from "../../services/sede.service";
import {MessagesService} from "../../services/messages.service";

@Component({
	templateUrl: 'app/components/sede/sede.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'sede',
	providers:[SedeStore, ConfirmationService]
})
export class SedeComponent extends CRUD<Sede, SedeService, SedeStore>{


    constructor(private sedeStore: SedeStore,
                messagesService: MessagesService,
    private confirmationService: ConfirmationService) {
        super(sedeStore, messagesService, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected getDefaultNewEntity(): Sede {
        return new Sede();
    }

    protected getEntityFromEvent(event: any): Sede {
        return new Sede(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'la sede ' + entity.nombre  ;
    }

    protected getEntityName(entity): string {
        return ' la sede ' ;
    }

    protected getSearchFields(): string[] {
        return ['nombre']
    }

}	
