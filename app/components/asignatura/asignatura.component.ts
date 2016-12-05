import {Component} from '@angular/core';
import {Asignatura} from "../../entities/asignatura";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {AsignaturaStore} from "../../services/asignatura.store";
import {Subject} from "rxjs";
import {CALENDAR_LOCALE_ES} from "../../commons/calendar-locale-es";

@Component({
    templateUrl: 'app/components/asignatura/asignatura.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'asignatura',
    providers: [AsignaturaStore, ConfirmationService]
})
export class AsignaturaComponent {

    asignatura: Asignatura = new Asignatura();

    validaciones: Message[] = [];

    msgs: Message[] = [];

    isNew = false;

    displayDialog: boolean;

    private searchTerms = new Subject<string>();

    constructor(private asignaturaStore: AsignaturaStore,  private confirmationService : ConfirmationService) { }

    ngOnInit() {
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.asignaturaStore.setLikes(terms.length > 0 ? {nombre: '*'+terms+'*'} : {}))


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
                    this.asignaturaStore.create(this.asignatura).subscribe(
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
                                    summary: error.json().error.error.title,
                                    detail: error.json().error.error.detail

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
                    this.asignaturaStore.update(this.asignatura).subscribe(
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
                                    summary: error.json().error.error.title,
                                    detail: error.json().error.error.detail
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
                this.asignaturaStore.delete(this.asignatura).subscribe(
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
                                severity:'error',
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

        this.asignaturaStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.asignaturaStore.setSorts([event]);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

}	
