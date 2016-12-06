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


@Component({
    templateUrl: 'app/components/comision/comision.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'comision',
    providers:[ComisionStore, AsignaturaService, PeriodoService,DocenteService, ConfirmationService]
})
export class ComisionComponent {

    msgs: Message[] = [];

    displayDialog: boolean;

    comision: Comision = new Comision();

    isNew: boolean;

    asignaturas: SelectItem[] = [];

    asignaturaSelected: Asignatura;

    periodos: SelectItem[] = [];

    periodoSelected: Periodo;

    docentes: SelectItem[] = [];

    docenteSelected: Docente;

    private searchTerms = new Subject<string>();

    constructor(private comisionStore: ComisionStore,
                private asignaturaService: AsignaturaService,
                private periodoService: PeriodoService,
                private docenteService: DocenteService,
                private confirmationService : ConfirmationService) { }

    ngOnInit() {
        var sel = this;
        this.asignaturaService.getAll().subscribe(asignaturas => {
            asignaturas.forEach(asignatura => {
                    sel.asignaturas.push({
                            label: asignatura.nombre, value: new Asignatura(asignatura)
                        }
                    )
                }
            )
        });
        var sel = this;
        this.periodoService.getAll().subscribe(periodos => {
            periodos.forEach(periodo => {
                    sel.periodos.push({
                            label: periodo.descripcion, value: new Periodo(periodo)
                        }
                    )
                }
            )
        });
        var sel = this;
        this.docenteService.getAll().subscribe(docentes => {
            docentes.forEach(docente => {
                    sel.docentes.push({
                            label: docente.apellido + ', ' + docente.nombre, value: new Docente(docente)
                        }
                    )
                }
            )
        });
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.comisionStore.setLikes(terms.length > 0 ?
                    {
                        nombre: '*'+terms+'*',
                        'asignatura.nombre': '*'+terms+'*',
                        'docente.nombre': '*'+terms+'*',
                        'docente.apellido' : '*'+terms+'*'
                    } : {}))
    }

    showDialogToAdd() {
        this.isNew = true;
        this.comision = new Comision();
        this.displayDialog = true;
        this.asignaturaSelected = this.asignaturas[0].value;
        this.periodoSelected = this.periodos[0].value;
        this.docenteSelected = this.docentes[0].value;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.comision =new Comision(event.data);
        this.asignaturaSelected =  new Asignatura(this.comision.asignatura);
        this.periodoSelected = new Periodo(this.comision.periodo);
        this.docenteSelected = new Docente(this.comision.docente);
        this.displayDialog = true;
    }

    save(){
        this.comision.asignatura = new Asignatura(this.asignaturaSelected);
        this.comision.periodo = new Periodo(this.periodoSelected);
        this.comision.docente = new Docente(this.docenteSelected);
        if (this.isNew)
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar la comision?',
                header: 'Confirmar ',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.comisionStore.create(this.comision).subscribe(
                        creada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Creada',
                                    detail: 'Se ha agregado la comision con exito!'
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
                message: 'Estas seguro que desea modificar la comision?',
                header: 'Confirmar modificacion',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.comisionStore.update(this.comision).subscribe(
                        guardada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Guardada',
                                    detail: 'Se ha guardado la comision  con exito!'
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
            message: 'Estas seguro que desea eliminar la comision?',
            header: 'Confirmar eliminacion',
            icon: 'fa ui-icon-delete',
            accept: () => {
                this.comisionStore.delete(this.comision).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity:'success',
                                summary:'Exito',
                                detail:'Se ha borrado la comision con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity: 'error',
                                summary: error.json().error.title,
                                detail: error.json().error.detail
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

        this.comisionStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.comisionStore.setSorts([event]);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }


}	/**
 * Created by Federico on 17/11/2016.
 */
