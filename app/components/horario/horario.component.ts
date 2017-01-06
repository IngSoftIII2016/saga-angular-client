import {Component} from '@angular/core';
import {Comision} from "../../entities/comision";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {ComisionStore} from "../../services/comision.store";
import {AsignaturaService} from "../../services/asignatura.service";
import {Asignatura} from "../../entities/asignatura";
import {PeriodoService} from "../../services/periodo.service";
import {Periodo} from "../../entities/periodo";
import {Subject} from "rxjs";
import {DocenteService} from "../../services/docente.service";
import {Docente} from "../../entities/docente";
import {ComisionService} from "../../services/comision.service";
import {AulaService} from "../../services/aula.service";
import {Horario} from "../../entities/horario";
import {Aula} from "../../entities/aula";
import {HorarioStore} from "../../services/horario.store";
import {CALENDAR_LOCALE_ES} from "../../commons/calendar-locale-es";
import {CRUD} from "../../commons/crud";
import {HorarioService} from "../../services/horario.service";


@Component({
    templateUrl: 'app/components/horario/horario.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'horario',
    providers: [HorarioStore, ComisionService, AulaService, ConfirmationService]
})
export class HorarioComponent extends CRUD<Horario, HorarioService, HorarioStore> {

    aulas: SelectItem[] = [];

    comisiones: SelectItem[] = [];

    dias: SelectItem[] = [];

    es = CALENDAR_LOCALE_ES;

    constructor(private horarioStore: HorarioStore,
                private aulaService: AulaService,
                private comisionService: ComisionService,
                private confirmationService: ConfirmationService) {
        super(horarioStore, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        var self = this;
        this.aulaService.getAll().subscribe(aulas => {
           self.aulas = aulas.map(aula => {
                    return {label: aula.nombre + ' - ' + aula.capacidad + ' - ' + aula.edificio.nombre, value: aula}
               }
            )
        });
        this.comisionService.getAll().subscribe(comisiones => {
           self.comisiones = comisiones.map(comision => {
                    return { label: comision.asignatura.nombre + ', ' + comision.periodo.descripcion,
                            value: comision}
                }
            )
        });
        for (let i = 1; i < 7; i++)
            this.dias.push({label: self.es.dayNames[i], value: i});

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

    protected getEntityReferencedLabel(): string {
        return 'el horario con dia ' + this.entity.dia + ' y hora ' + this.entity.hora_inicio;
    }

    protected getSearchFields(): string[] {
        return ['dia' , 'duracion', 'hora_inicio', 'aula.nombre', 'aula.edificio.nombre', 'comision.asignatura.nombre', 'comision.periodo.descripcion']
    }



}
/**
 * Created by Federico on 17/11/2016.
 */
/**
 * Created by Federico on 29/11/2016.
 */
