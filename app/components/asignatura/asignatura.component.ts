import {Component} from '@angular/core';
import {Asignatura} from "../../entities/asignatura";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {AsignaturaStore} from "../../services/asignatura.store";

@Component({
    templateUrl: 'app/components/asignatura/asignatura.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'asignatura',
    providers: [AsignaturaStore, ConfirmationService]
})
export class AsignaturaComponent {

    asignatura: Asignatura = new Asignatura();

    msgs: Message[] = [];

    isNew = false;

    displayDialog: boolean;

    constructor(private asignaturaStore: AsignaturaStore,  private confirmationService : ConfirmationService) { }

    showDialogToAdd() {
        this.isNew = true;
        this.asignatura = new Asignatura();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.asignatura =new Asignatura(event.data);
        this.displayDialog = true;
    }

    save() {
        this.asignaturaStore.save(this.asignatura).subscribe(
            guardada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity:'success',
                        summary:'Guardado',
                        detail:'Se ha guardado la asignatura '+ guardada.nombre + ' con exito!'
                    })
            },
            error => {
                console.log(error);
                this.msgs.push(
                    {
                        severity:'error',
                        summary:'Error',
                        detail:'No se ha podido guardar la asignatura:\n' + error
                    });
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la asignatura?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
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
                                summary:'Error',
                                detail:'No se ha podido eliminar la asignatura:\n' + error
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

        this.asignaturaStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.asignaturaStore.setSorts([event]);
    }

}	
