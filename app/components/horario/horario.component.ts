import {Component, Input, OnInit} from '@angular/core';
import {ConfirmationService, SelectItem} from "primeng/components/common/api";
import {ComisionService} from "../../services/comision.service";
import {AulaService} from "../../services/aula.service";
import {Horario} from "../../entities/horario";
import {HorarioStore} from "../../services/horario.store";
import {CALENDAR_LOCALE_ES} from "../../commons/calendar-locale-es";
import {CRUD} from "../../commons/crud";
import {HorarioService} from "../../services/horario.service";
import {Aula} from "../../entities/aula";
import {PeriodoService} from "../../services/periodo.service";
import {Periodo} from "../../entities/periodo";
import {Subject} from "rxjs";
import {QueryOptions} from "../../commons/generic.service";
import {Comision} from "../../entities/comision";
import {MessagesService} from "../../services/messages.service";


@Component({
    templateUrl: 'app/components/horario/horario.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'horarios',
    providers: [HorarioStore, ComisionService, AulaService, PeriodoService, ConfirmationService]
})
export class HorarioComponent extends CRUD<Horario, HorarioService, HorarioStore> implements OnInit{


    @Input()
    private filtersEnabled: boolean = true;

    @Input()
    private comision: Comision;

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

    periodoIdFilterSubject = new Subject<number>();

    isFilter: boolean = false;

    constructor(private horarioStore: HorarioStore,
                private aulaService: AulaService,
                private periodoService: PeriodoService,
                private comisionService: ComisionService,
                messagesService: MessagesService,
                private confirmationService: ConfirmationService) {
        super(horarioStore, messagesService, confirmationService);
    }

    toggleFilter() {
        this.isFilter = !this.isFilter;
    }

    protected getDefaultNewEntity(): Horario {
        return new Horario({
            aula: this.aulas[0].value as Aula,
            comision: this.comision ? this.comision : this.comisiones[0].value as Comision
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
            'comision.periodo.descripcion',
            'aula.nombre',
            'aula.edificio.nombre',
            'duracion',
            'hora_inicio'];
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

        if(this.comision)
            this.filterComision(this.comision.id);

        var self = this;
        if(!this.comision == null) {
            this.entity.comision = this.comision;
        }
        this.aulaService.getAll().subscribe(aulas => {
            aulas.forEach(aula => {
                let label = aula.nombre + ' - ' + aula.edificio.nombre;
                self.aulas.push({label: label, value: aula});
                self.aulasFilter.push({label: label, value: aula.id});
            });
            self.aulasFilter.unshift({label: 'Todas', value: null});
            self.aulaFilter = self.aulasFilter[0].value;
        });

        this.comisionService.getAll().subscribe(comisiones => {
            self.comisiones = comisiones.map(comision => {
                return {label: comision.etiqueta(), value: comision};
            });
        });

        this.periodoIdFilterSubject
            .switchMap(periodoId => {
                if (periodoId) {
                    let qo = self.comisionService.getDefaultQueryOptions();
                    qo.merge({filters: {'periodo.id': periodoId}, page: -1});
                    return self.comisionService.query(qo);
                } else
                    return self.comisionService.getAll()
            })
            .subscribe(comisiones => {
                self.comisionesFilter = comisiones.map(comision => {
                    return {label: comision.etiqueta(), value: comision.id};
                });
                self.comisionesFilter.unshift({label: 'Todas', value: null});
            });

        this.periodoService.getAll().subscribe(periodos => {
            self.periodosFilter = periodos.map(periodo => {
                return {label: periodo.descripcion, value: periodo.id}
            });
            self.periodosFilter.unshift({label: 'Todos', value: null});
            self.periodoFilter = self.periodosFilter[0].value;
            self.filterPeriodo(this.periodosFilter[0].value);
        });

        this.periodoIdFilterSubject.subscribe(periodoId => {
            self.filter('comision.periodo.id', periodoId)
        });

        this.diasFilter.push({label: 'Todos', value: null});
        for (let i = 1; i < 7; i++) {
            this.dias.push({label: this.es.dayNames[i], value: i});
            this.diasFilter.push({label: this.es.dayNames[i], value: i});
        }
        this.diaFilter = self.diasFilter[0].value;


    }

    filterPeriodo(periodoId: number) {
        this.periodoIdFilterSubject.next(periodoId);
    }

    filterComision(comisionID:number){
        this.filter('comision.id', comisionID);
    }


}
/**
 * Created by Federico on 17/11/2016.
 */
/**
 * Created by Federico on 29/11/2016.
 */
