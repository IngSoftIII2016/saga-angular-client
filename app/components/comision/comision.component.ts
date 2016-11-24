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

    asignaturas: SelectItem[] = [];

    asignaturaSelected: SelectItem;

    periodos: SelectItem[] = [];

    periodo : string;

    asignatura : string;

    periodoSelected: SelectItem;

    private searchTerms = new Subject<string>();

    constructor(private comisionStore: ComisionStore,
                private asignaturaService: AsignaturaService,
                private periodoService: PeriodoService,
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
        this.asignatura = this.asignaturaSelected.label;
        this.periodo = this.periodoSelected.label;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.comision =new Comision(event.data);
        this.asignaturaSelected = {label: this.comision.asignatura.nombre, value: new Asignatura(this.comision.asignatura)};
        this.periodoSelected = {label: this.comision.periodo.descripcion, value: new Periodo(this.comision.periodo)};
        this.asignatura = this.comision.asignatura.nombre;
        this.periodo = this.comision.periodo.descripcion;
        this.displayDialog = true;
    }

    save() {
        if (this.isNew) {
            if(this.periodoSelected == null)
                this.comision.periodo= this.periodos[0].value;
            else
                this.comision.periodo=  new Periodo (this.periodoSelected.value);
            if(this.asignaturaSelected == null)
                this.comision.asignatura= this.asignaturas[0].value;
            else
                this.comision.asignatura=  new Asignatura(this.asignaturaSelected .value);
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar la comision?',
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
                                    detail: 'Se ha agregado la comision ' + creada.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido crear la comision:\n' + error
                                });
                        });
                }
            });
        }
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar la comision?',
                header: 'Confirmar ',
                icon: 'fa fa-pencil-square-o',
                accept: () => {
                    this.comisionStore.update(this.comision).subscribe(
                        guardada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Creada',
                                    detail: 'Se ha agregado la comision ' + guardada.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido crear la comision:\n' + error
                                });
                        });
                }
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la comision?',
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
                                detail:'Se ha borrado la comision con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity:'error',
                                summary:'Error',
                                detail:'No se ha podido eliminar la comision:\n' + error
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
