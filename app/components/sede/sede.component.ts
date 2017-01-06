import {Component} from '@angular/core';
import {Sede} from '../../entities/sede';
import {SedeStore} from "../../services/sede.store";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {CRUD} from "../../commons/crud";
import {SedeService} from "../../services/sede.service";

@Component({
	templateUrl: '/sede.component.html',
    styleUrls: ['../../../resources/demo/css/dialog.css'],
	selector: 'sede',
	providers:[SedeStore, ConfirmationService]
})
export class SedeComponent extends CRUD<Sede, SedeService, SedeStore>{


    constructor(private sedeStore: SedeStore,
    private confirmationService: ConfirmationService) {
        super(sedeStore,confirmationService);
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

    protected getEntityReferencedLabel(): string {
        return 'la sede ' + this.entity.nombre  ;
    }

    protected getSearchFields(): string[] {
        return ['nombre']
    }

}	
