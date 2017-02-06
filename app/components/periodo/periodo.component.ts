import {Periodo} from '../../entities/periodo';
import {PeriodoStore} from "../../services/periodo.store";
import {Component} from '@angular/core';
import {CALENDAR_LOCALE_ES} from "../../commons/calendar-locale-es";
import {ConfirmationService, Message} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {PeriodoService} from "../../services/periodo.service";
import {CRUD} from "../../commons/crud";
import {MessagesService} from "../../services/messages.service";


@Component({
	templateUrl: 'app/components/periodo/periodo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'periodo',
	providers:[PeriodoStore, ConfirmationService]
})
export class PeriodoComponent extends CRUD<Periodo, PeriodoService, PeriodoStore>{

    fecha_inicio: Date;

    fecha_fin: Date;

    es: any = CALENDAR_LOCALE_ES;

    constructor(
        private periodoStore: PeriodoStore,
        messagesService: MessagesService,
        private confirmationService: ConfirmationService) {
        super(periodoStore, messagesService, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected getDefaultNewEntity(): Periodo {
        return new Periodo();
    }

    protected getEntityFromEvent(event: any): Periodo {
        return new Periodo(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'el periodo ' + entity.descripcion + ' desde ' + entity.getFechaInicioString() + ' hasta  ' + entity.getFechaFinString();
    }
    protected getEntityName(entity): string {
        return ' el periodo ' ;
    }

    protected getSearchFields(): string[] {
        return ['nombre' , 'fecha_inicio', 'fecha_fin']
    }

    protected onOpenDialog(periodo: Periodo): void {
        this.fecha_inicio = periodo.getFechaInicioDate();
        this.fecha_fin = periodo.getFechaFinDate();
    }

    protected onSave(periodo: Periodo): Periodo {
        periodo.setFechaInicioDate(this.fecha_inicio);
        periodo.setFechaFinDate(this.fecha_fin);
        return periodo;
    }

}	
