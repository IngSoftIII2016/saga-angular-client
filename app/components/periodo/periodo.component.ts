import {Component} from '@angular/core';
import {Periodo} from '../../entities/periodo';
import {PeriodoStore} from "../../services/periodo.store";
import {CALENDAR_LOCALE_ES} from "../../commons/calendar-locale-es";
import {ConfirmationService, Message} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {PeriodoService} from "../../services/periodo.service";
import {CRUD} from "../../commons/crud";


@Component({
	templateUrl: '/periodo.component.html',
    styleUrls: ['../../../resources/demo/css/dialog.css'],
	selector: 'periodo',
	providers:[PeriodoStore, ConfirmationService]
})
export class PeriodoComponent extends CRUD<Periodo, PeriodoService, PeriodoStore>{

    fechaInicio: Date;
    fechaFin: Date;

    es: any = CALENDAR_LOCALE_ES;

    constructor(
        private periodoStore: PeriodoStore,
        private confirmationService: ConfirmationService) {
        super(periodoStore,confirmationService);
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

    protected getEntityReferencedLabel(): string {
        return 'el periodo ' + this.entity.descripcion ;
    }

    protected getSearchFields(): string[] {
        return ['nombre' , 'fecha_inicio', 'fecha_fin']
    }


}	
