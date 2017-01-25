import {Component} from '@angular/core';
import {Clase} from "../../entities/clase";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {Aula} from "../../entities/aula";
import {Subject, Timestamp} from "rxjs";
import {CALENDAR_LOCALE_ES} from "../../commons/calendar-locale-es";
import {CRUD} from "../../commons/crud";
import {ClaseService} from "../../services/clase.service";
import {ClaseStore} from "../../services/clase.store";
import {AulaService} from "../../services/aula.service";
import {Comision} from "../../entities/comision";
import {ComisionService} from "../../services/comision.service";
import {PeriodoService} from "../../services/periodo.service";
import {Periodo} from "../../entities/periodo";


@Component({
    templateUrl: 'app/components/presentismo/presentismo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'presentismo',
    providers:[ClaseStore, ComisionService, PeriodoService]
})
export class PresentismoComponent  extends CRUD<Clase, ClaseService, ClaseStore>{

    periodos: SelectItem[] = [];

    periodo: Periodo;

    comisiones: SelectItem[] = [];

    comision: Comision;

    es: any = CALENDAR_LOCALE_ES;

    constructor(private claseStore: ClaseStore,
                private comisionService: ComisionService,
                private periodoService: PeriodoService) {
        super(claseStore);
    }

    ngOnInit() {
        super.ngOnInit();
        let self = this;
        this.comisionService.getAll().subscribe(comisiones => {
            self.comisiones = comisiones.map(comision => {
                return {label: comision.asignatura.nombre, value: comision}
            })
            self.comision = comisiones[0];
            self.filtrarComision();
        });
        this.periodoService.getAll().subscribe(periodos => {
            self.periodos = periodos.map(periodo => {
                return {label: periodo.descripcion, value: periodo}
            })
            self.periodo = periodos[periodos.length - 1];
            self.filtrarPeriodo();
        });
    }
    protected getDefaultNewEntity(): Clase {
        return new Clase();
    }

    protected getEntityFromEvent(event: any): Clase {
        return new Clase(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'la clase del aula ' + entity.aula.nombre + ' con fecha ' + entity.getFechaString();
    }

    protected getSearchFields(): string[] {
        return ['aula.nombre' , 'fecha', 'hora_inicio', 'hora_fin', 'comentario']
    }
    protected onOpenDialog(clase: Clase): void {
    }

    protected onSave(clase: Clase): Clase {
        return clase;
    }

    public filtrarComision() : void {
        this.filter('horario.comision.id', this.comision.id);
    }

    public filtrarPeriodo() : void {
        this.filter('horario.comision.periodo.id', this.periodo.id);
    }

}
/**
 * Created by Federico on 17/11/2016.
 */
