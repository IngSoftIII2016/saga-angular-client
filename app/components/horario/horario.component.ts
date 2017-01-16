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


@Component({
    templateUrl: 'app/components/horario/horario.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'horario',
    providers: [HorarioStore, ComisionService, AulaService, ConfirmationService]
})
export class HorarioComponent extends CRUD<Horario, HorarioService, HorarioStore> {


    hora_inicio: Date;

    duracion: Date;

    es: any = CALENDAR_LOCALE_ES;

    dias: SelectItem[] = [];

    aulas: SelectItem[] = [];

    comisiones: SelectItem[] = [];

    constructor(private horarioStore: HorarioStore,
                private aulaService: AulaService,
                private comisionService: ComisionService,
                private confirmationService: ConfirmationService) {
        super(horarioStore, confirmationService);
    }

    protected getDefaultNewEntity(): Horario {
        return new Horario();
    }

    protected getEntityFromEvent(event: any): Horario {
        return new Horario(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'el horario de los ' + this.entity.toString()
            + ', comision ' + this.entity.comision.toString() + ' en ' + this.entity.aula.toString();
    }

    protected getSearchFields(): string[] {
        return [
            'comision.asignatura.nombre',
            'aula.nombre',
            'comision.periodo.descripcion',
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
            self.aulas = aulas.map(aula => {
                return {label: aula.nombre + ' - ' +  aula.edificio.nombre, value: aula}
            })
        })
        this.comisionService.getAll().subscribe(comisiones => {
            self.comisiones = comisiones.map(comision => {
                return {
                    label: comision.asignatura.nombre + ' ' + comision.nombre + ', ' + comision.periodo.descripcion,
                    value: comision }
            })
        });
        for (let i = 1; i < 7; i++)
            this.dias.push({label: this.es.dayNames[i], value: i});

    }


}
/**
 * Created by Federico on 17/11/2016.
 */
/**
 * Created by Federico on 29/11/2016.
 */
