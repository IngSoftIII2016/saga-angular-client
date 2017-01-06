import {Component} from '@angular/core';
import {Evento} from "../../entities/evento";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {EventoStore} from "../../services/evento.store";
import {Subject} from "rxjs";
import {AulaService} from "../../services/aula.service";
import {Aula} from "../../entities/aula";
import {CALENDAR_LOCALE_ES} from "../../commons/calendar-locale-es";
import {EventoService} from "../../services/evento.service";
import {CRUD} from "../../commons/crud";


@Component({
    templateUrl: 'app/components/evento/evento.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'evento',
    providers:[EventoStore, AulaService, ConfirmationService]
})
export class EventoComponent extends CRUD<Evento, EventoService, EventoStore>{

    aulas: SelectItem[] = [];

   /* fecha: Date;
    hora_inicio: Date;
    hora_fin: Date;
    es: any = CALENDAR_LOCALE_ES;
*/
    constructor(private eventoStore: EventoStore,
                private aulaService: AulaService,
                private confirmationService : ConfirmationService) {
        super(eventoStore,confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        var sel = this;
        this.aulaService.getAll().subscribe(aulas => {
            sel.aulas = aulas.map(aula => {
                return {label: aula.nombre + ' - ' + aula.capacidad + ' - ' + aula.edificio.nombre, value: aula}
                }
            )
        });
    }

    protected getDefaultNewEntity(): Evento {
        return new Evento({
            aula: this.aulas[0].value as Aula
        });
    }

    protected getEntityFromEvent(event: any): Evento {
        return new Evento(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'el evento del aula ' + this.entity.aula.nombre + ' con fecha ' + this.entity.fecha ;
    }

    protected getSearchFields(): string[] {
        return ['aula.nombre' , 'fecha', 'hora_inicio', 'hora_fin', 'motivo']
    }



}
/**
 * Created by Federico on 17/11/2016.
 */
/**
 * Created by Federico on 17/11/2016.
 */
