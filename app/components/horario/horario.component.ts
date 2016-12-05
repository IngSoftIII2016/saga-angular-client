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


@Component({
    templateUrl: 'app/components/horario/horario.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'horario',
    providers: [HorarioStore, ComisionService, AulaService, ConfirmationService]
})
export class HorarioComponent {

    validaciones: Message[] = [];

    msgs: Message[] = [];

    displayDialog: boolean;

    horario: Horario = new Horario();

    isNew: boolean;

    hora_inicio: Date;

    duracion: Date;

    es: any = CALENDAR_LOCALE_ES;

    dias: SelectItem[] = [];

    diaSelected: number;

    aulas: SelectItem[] = [];

    aulaSelected: Aula;

    comisiones: SelectItem[] = [];

    comisionSelected: Comision;

    private searchTerms = new Subject<string>();

    constructor(private horarioStore: HorarioStore,
                private aulaService: AulaService,
                private comisionService: ComisionService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        var self = this;
        this.aulaService.getAll().subscribe(aulas => {
            aulas.forEach(aula => {
                    self.aulas.push({
                            label: aula.nombre + ' - ' + aula.capacidad + ' - ' + aula.edificio.nombre, value: new Aula(aula)
                        }
                    )
                }
            )
        });
        this.comisionService.getAll().subscribe(comisiones => {
            comisiones.forEach(comision => {
                    self.comisiones.push({
                            label: comision.asignatura.nombre + ', ' + comision.periodo.descripcion,
                            value: new Comision(comision)
                        }
                    )
                }
            )
        });
        for (let i = 1; i < 7; i++)
            this.dias.push({label: self.es.dayNames[i], value: i});

        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.horarioStore.setLikes(terms.length > 0 ?
                    {
                        'asignatura.nombre': '*' + terms + '*',
                        'periodo.descripcion': '*' + terms + '*',
                        'docente.apellido': '*' + terms + '*',
                        'docente.nombre': '*' + terms + '*'
                    } : {}))
    }

    showDialogToAdd() {
        this.validaciones = [];
        this.isNew = true;
        this.horario = new Horario();
        this.hora_inicio = new Date();
        this.duracion = new Date();
        this.displayDialog = true;
        this.diaSelected = this.dias[0].value;
        this.aulaSelected = this.aulas[0].value;
        this.comisionSelected = this.comisiones[0].value;
    }

    onRowSelect(event) {
        this.validaciones = [];
        this.isNew = false;
        this.horario = new Horario(event.data);
        this.hora_inicio = this.horario.getHoraInicio();
        this.duracion = this.horario.getDuracion();
        this.diaSelected = this.horario.dia;
        this.aulaSelected = new Aula(this.horario.aula);
        this.comisionSelected = new Comision(this.horario.comision);
        this.displayDialog = true;
    }

    save() {

        this.horario.hora_inicio = this.hora_inicio.toTimeString().split(' ')[0];
        this.horario.duracion = this.duracion.toTimeString().split(' ')[0];
        this.horario.dia = this.diaSelected;
        this.horario.aula = new Aula(this.aulaSelected);
        this.horario.comision = new Comision(this.comisionSelected);
        if (this.isNew)
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar el horario?',
                header: 'Confirmar ',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.horarioStore.create(this.horario).subscribe(
                        creada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Creada',
                                    detail: 'Se ha agregado el horario con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: error.json().error.title,
                                    detail: error.json().error.detail
                                });
                        });
                }
            });
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar la comision?',
                header: 'Confirmar modificacion',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.horarioStore.update(this.horario).subscribe(
                        guardada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Guardada',
                                    detail: 'Se ha guardado el horario con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: error.json().error.title,
                                    detail: error.json().error.detail
                                });
                        });
                }
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar el horario?',
            header: 'Confirmar eliminacion',
            icon: 'fa ui-icon-delete',
            accept: () => {
                this.horarioStore.delete(this.horario).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity: 'success',
                                summary: 'Exito',
                                detail: 'Se ha borrado el horario con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity: 'error',
                                summary: error.json().error.error.title,
                                detail: error.json().error.error.detail
                            });
                    }
                );
            }
        });
    }

    pageChange(event) {
        let qo = {
            size: event.rows,
            page: event.page + 1
        };
        console.log(qo);

        this.horarioStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.horarioStore.setSorts([event]);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }


}
/**
 * Created by Federico on 17/11/2016.
 */
/**
 * Created by Federico on 29/11/2016.
 */
