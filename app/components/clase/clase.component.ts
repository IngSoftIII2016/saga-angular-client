import {Component} from '@angular/core';
import {Clase} from "../../entities/clase";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {ClaseStore} from "../../services/clase.store";
import {AulaService} from "../../services/aula.service";
import {Aula} from "../../entities/aula";
import {Subject, Timestamp} from "rxjs";
import {CALENDAR_LOCALE_ES} from "../../commons/calendar-locale-es";
import {CRUD} from "../../commons/crud";
import {ClaseService} from "../../services/clase.service";


@Component({
    templateUrl: 'app/components/clase/clase.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'clase',
    providers:[ClaseStore,AulaService, ConfirmationService]
})
export class ClaseComponent  extends CRUD<Clase, ClaseService, ClaseStore>{


    aulas: SelectItem[] = [];


    fecha: Date;
    hora_inicio: Date;
    hora_fin: Date;
    es: any = CALENDAR_LOCALE_ES;

    constructor(private claseStore: ClaseStore,
                private aulaService: AulaService,
                private confirmationService : ConfirmationService) {
        super(claseStore, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        var sel = this;
        this.aulaService.getAll().subscribe(aulas => {
            sel.aulas = aulas.map(aula => {
                return {label: aula.nombre + ' - ' + aula.capacidad + ' - ' + aula.edificio.nombre , value: aula }
                }
            )
        });
    }
    protected getDefaultNewEntity(): Clase {
        return new Clase({
            aula: this.aulas[0].value as Aula
        });
    }

    protected getEntityFromEvent(event: any): Clase {
        return new Clase(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'la clase del aula ' + this.entity.aula.nombre + ' con fecha ' + this.entity.fecha ;
    }

    protected getSearchFields(): string[] {
        return ['aula.nombre' , 'fecha', 'hora_inicio', 'hora_fin', 'comentario']
    }


}
/**
 * Created by Federico on 17/11/2016.
 */
