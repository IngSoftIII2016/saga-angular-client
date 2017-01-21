import {Component, Input} from '@angular/core';
import {ConfirmationService, SelectItem} from "primeng/components/common/api";
import {ComisionService} from "../../services/comision.service";
import {AulaService} from "../../services/aula.service";
import {Horario} from "../../entities/horario";
import {HorarioStore} from "../../services/horario.store";
import {CALENDAR_LOCALE_ES} from "../../commons/calendar-locale-es";
import {CRUD} from "../../commons/crud";
import {HorarioService} from "../../services/horario.service";
import {Comision} from "../../entities/comision";
import {Aula} from "../../entities/aula";
import {EdificioService} from "../../services/edificio.service";
import {PeriodoService} from "../../services/periodo.service";
import {Periodo} from "../../entities/periodo";


@Component({
    templateUrl: 'app/components/horario/horario.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'horario',
    providers: [HorarioStore, ComisionService, AulaService, PeriodoService, ConfirmationService]
})
export class HorarioComponent extends CRUD<Horario, HorarioService, HorarioStore> {


    hora_inicio: Date;

    duracion: Date;

    es: any = CALENDAR_LOCALE_ES;

    dias: SelectItem[] = [];

    aulas: SelectItem[] = [];

    comisiones: SelectItem[] = [];

    diasFilter: SelectItem[] = [];

    aulasFilter: SelectItem[] = [];

    comisionesFilter: SelectItem[] = [];

    periodosFilter: SelectItem[] = [];

    diaFilter: String;

    aulaFilter: Aula;

    comisionFilter: Comision;

    periodoFilter: Periodo;

    isFilter: boolean = false;

    constructor(private horarioStore: HorarioStore,
                private aulaService: AulaService,
                private periodoService: PeriodoService,
                private comisionService: ComisionService,
                private confirmationService: ConfirmationService) {
        super(horarioStore, confirmationService);
    }

    toggleFilter() {
        this.isFilter = !this.isFilter;
    }

    protected getDefaultNewEntity(): Horario {
        return new Horario({
            aula: this.aulas[0].value as Aula,
            comision: this.comisiones[0].value as Comision
        });
    }

    protected getEntityFromEvent(event: any): Horario {
        return new Horario(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'el horario del ' + entity.toString()
            + ', comision ' + entity.comision.asignatura.nombre + ' en ' + entity.aula.nombre;
    }

    protected getSearchFields(): string[] {
        return [
            'comision.asignatura.nombre',
            'comision.nombre',
            'aula.edificio.nombre',
            'comision.docente.apellido',
            'comision.docente.nombre'];
    }

    protected onOpenDialog(horario: Horario): void {
        this.hora_inicio = horario.getHoraInicioDate();
        this.duracion = horario.getDuracionDate();
    }

    protected onSave(horario: Horario): Horario {
        horario.setHoraInicioDate(this.hora_inicio);
        horario.setDuracionDate(this.duracion);
        return horario;
    }

    ngOnInit() {
        super.ngOnInit();
        var self = this;
        this.aulaService.getAll().subscribe(aulas => {
            aulas.forEach(aula => {
                let item = {label: aula.nombre + ' - ' + aula.edificio.nombre, value: aula};
                self.aulas.push(item);
                self.aulasFilter.push(item);
            });
            self.aulasFilter.unshift({label: 'Todas', value: null});
            self.aulaFilter = self.aulasFilter[0].value;
        });
        this.comisionService.getAll().subscribe(comisiones => {
            comisiones.forEach(comision => {
                let item = {
                    label: comision.asignatura.nombre + ' ' + comision.nombre + ', ' + comision.periodo.descripcion,
                    value: comision
                };
                self.comisiones.push(item);
                self.comisionesFilter.push(item);
            });
            self.comisionesFilter.unshift({label: 'Todas', value: null});
            self.comisionFilter = self.comisionesFilter[0].value;
        });

        this.periodoService.getAll().subscribe(periodos => {
            self.periodosFilter = periodos.map(periodo => {
                return {
                    label: periodo.descripcion, value: periodo.id
                }
            });
            self.periodosFilter.unshift({label: 'Todos', value: null});
            self.periodoFilter = self.periodosFilter[0].value;
        });

        this.diasFilter.push({label: 'Todos', value: null});
        for (let i = 1; i < 7; i++) {
            this.dias.push({label: this.es.dayNames[i], value: i});
            this.diasFilter.push({label: this.es.dayNames[i], value: i});
        }
        self.diaFilter = self.diasFilter[0].value;
    }


}
/**
 * Created by Federico on 17/11/2016.
 */
/**
 * Created by Federico on 29/11/2016.
 */
