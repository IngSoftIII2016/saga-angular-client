import {Component} from '@angular/core';
import {Asignatura} from "../../entities/asignatura";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {AsignaturaStore} from "../../services/asignatura.store";
import {Subject} from "rxjs";
import {CRUD} from "../../commons/crud";
import {AsignaturaService} from "../../services/asignatura.service";

@Component({
    templateUrl: 'app/components/composite-asignatura/composite-asignatura.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'asignatura',
    providers: [AsignaturaStore, ConfirmationService]
})
export class CompositeAsignaturaComponent extends CRUD<Asignatura, AsignaturaService, AsignaturaStore> {

    asignatura: Asignatura = new Asignatura();

    validaciones: Message[] = [];

    msgs: Message[] = [];

    isNew = false;

    displayDialog: boolean;

    constructor(store: AsignaturaStore,  private confirmationService : ConfirmationService) {
        super(store);
    }

    protected getSearchFields(): string[] {
        return ['nombre'];
    }

    protected getDefaultNewEntity(): Asignatura {
        return new Asignatura();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    showDialogToAdd() {
        this.validaciones = [];
        this.isNew = true;
        this.asignatura = new Asignatura();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.validaciones = [];
        this.isNew = false;
        this.asignatura =new Asignatura(event.data);
        this.displayDialog = true;
    }

    save() {
        if (!this.asignatura.nombre) {
            this.validaciones[0] = {
                severity: 'error',
                summary: 'Error',
                detail: 'Complete los campos requeridos'
            };
        }
        else
            if (this.isNew) {
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar la asignatura?',
                header: 'Confirmar ',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.store.create(this.asignatura).subscribe(
                        creada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Creada',
                                    detail: 'Se ha agregado la asignatura ' + creada.nombre + ' con exito!'
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
        //update
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea modificar la asignatura?',
                header: 'Confirmar modificacion',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.store.update(this.asignatura).subscribe(
                        guardada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Guardada',
                                    detail: 'Se han guardado los cambios a ' + guardada.nombre + ' con exito!'
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
            message: 'Estas seguro que desea eliminar la asignatura?',
            header: 'Confirmar eliminacion',
            icon: 'fa ui-icon-delete',
            accept: () => {
                this.store.delete(this.asignatura).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity:'success',
                                summary:'Exito',
                                detail:'Se ha borrado la asignatura '+ borrada.nombre + ' con exito!'
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

        this.store.mergeQueryOptions(qo);
    }

    sort(event) {
        this.store.setSorts([event]);
    }

}	
