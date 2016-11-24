/**
 * Created by juan on 24/11/16.
 */
import {Component} from '@angular/core';
import {Message, ConfirmationService} from "primeng/components/common/api";
import {AsignaturaCarrera} from "../../entities/asignatura-carrera";
import {AsignaturaCarreraStore} from "../../services/asignatura-carrera.store";

@Component({
    templateUrl: 'app/components/asignatura-carrera/asignatura-carrera.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'asignatura-carrera',
    providers: [AsignaturaCarreraStore, ConfirmationService]
})
export class AsignaturaCarreraComponent {

    msgs: Message[] = [];

    displayDialog: boolean;

    asignaturaCarrera: AsignaturaCarrera = new AsignaturaCarrera();

    isNew: boolean;

    constructor(private asignaturaCarreraStore: AsignaturaCarreraStore,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {

    }


    showDialogToAdd() {
        this.isNew = true;
        this.asignaturaCarrera = new AsignaturaCarrera();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.asignaturaCarrera = new AsignaturaCarrera(event.data);
        this.displayDialog = true;
    }

    save() {
        if (this.isNew) {
            this.asignaturaCarreraStore.create(this.asignaturaCarrera)
                .subscribe(
                    creada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity: 'success',
                                summary: 'Creada',
                                detail: 'Se ha agregado la asignatura ' + creada.asignatura.nombre + ' con exito!'
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

        //update
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea modificar el aula?',
                header: 'Confirmar modificacion',
                icon: 'fa fa-pencil-square-o',
                accept: () => {
                    this.asignaturaCarreraStore.update(this.asignaturaCarrera).subscribe(
                        guardada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Guardada',
                                    detail: 'Se han guardado los cambios a ' + guardada.asignatura.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido guardar la asignatura:\n' + error
                                });
                        });
                }
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la asignatura?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
            accept: () => {
                this.asignaturaCarreraStore.delete(this.asignaturaCarrera).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity: 'success',
                                summary: 'Borrado',
                                detail: 'Se ha borrado ' + borrada.asignatura.nombre + ' con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity: 'error',
                                summary: 'Error',
                                detail: 'No se ha podido eliminar:\n' + error
                            });
                    }
                );
            }
        });
    }

    message(evento: string) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Exito', detail: 'Aula ' + evento + ' con exito!'});
    }

    pageChange(event) {
        let qo = {
            size: event.rows,
            page: event.page + 1
        };
        console.log(qo);

        this.asignaturaCarreraStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.asignaturaCarreraStore.setSorts([event]);
    }

}