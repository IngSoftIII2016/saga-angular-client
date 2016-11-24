import {Component} from '@angular/core';
import {Comision} from "../../entities/comision";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {ComisionStore} from "../../services/comision.store";
import {AsignaturaService} from "../../services/asignatura.service";
import {Asignatura} from "../../entities/asignatura";
import {PeriodoService} from "../../services/periodo.service";
import {Periodo} from "../../entities/periodo";
import {Subject} from "rxjs";


@Component({
    templateUrl: 'app/components/comision/comision.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'comision',
    providers:[ComisionStore, AsignaturaService, PeriodoService, ConfirmationService]
})
export class ComisionComponent {

    msgs: Message[] = [];

    displayDialog: boolean;

    comision: Comision = new Comision();

    isNew: boolean;

    asignatura: SelectItem[] = [];

    asignaturaSelected: SelectItem;

    periodo: SelectItem[] = [];

    periodoSelected: SelectItem;

    private searchTerms = new Subject<string>();

    constructor(private comisionStore: ComisionStore,
                private asignaturaService: AsignaturaService,
                private periodoService: PeriodoService,
                private confirmationService : ConfirmationService) { }

    ngOnInit() {
        var sel = this;
        this.asignaturaService.getAll().subscribe(asignatura => {
            asignatura.forEach(asignatura => {
                    sel.asignatura.push({
                            label: asignatura.nombre, value: new Asignatura(asignatura)
                        }
                    )
                }
            )
        });
        var sel = this;
        this.periodoService.getAll().subscribe(periodo => {
            periodo.forEach(periodo => {
                    sel.periodo.push({
                            label: periodo.descripcion, value: new Periodo(periodo)
                        }
                    )
                }
            )
        });
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.comisionStore.setLikes(terms.length > 0 ? {nombre: '*'+terms+'*', 'asignatura.nombre': '*'+terms+'*'} : {}))
    }

    showDialogToAdd() {
        this.isNew = true;
        this.comision = new Comision();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.comision =new Comision(event.data);
        this.asignaturaSelected = {label: this.comision.asignatura.nombre, value: new Asignatura(this.comision.asignatura)};
        this.periodoSelected = {label: this.comision.periodo.descripcion, value: new Periodo(this.comision.periodo)};
        this.displayDialog = true;
    }

    save() {
        if (this.comision.asignatura.nombre != this.asignaturaSelected.label){
            this.comision.asignatura = new Asignatura(this.asignaturaSelected);
        }
        if (this.comision.periodo.descripcion != this.periodoSelected.label){
            this.comision.periodo = new Periodo(this.periodoSelected);
        }
        if (this.isNew) {
            this.comision.asignatura = new Asignatura(this.asignaturaSelected);
            this.comision.periodo = new Periodo(this.periodoSelected);
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar el aula?',
                header: 'Confirmar ',
                icon: 'fa fa-plus-square',
                accept: () => {
                    this.comisionStore.create(this.comision).subscribe(
                        creada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Creada',
                                    detail: 'Se ha agregado el aula ' + creada.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido crear el aula:\n' + error
                                });
                        });
                }
            });
        }
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar el aula?',
                header: 'Confirmar ',
                icon: 'fa fa-plus-square',
                accept: () => {
                    this.comisionStore.create(this.comision).subscribe(
                        creada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Creada',
                                    detail: 'Se ha agregado el aula ' + creada.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido crear el aula:\n' + error
                                });
                        });
                }
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la clase?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
            accept: () => {
                this.comisionStore.delete(this.comision).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity:'success',
                                summary:'Exito',
                                detail:'Se ha borrado la clase con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity:'error',
                                summary:'Error',
                                detail:'No se ha podido eliminar la clase:\n' + error
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
