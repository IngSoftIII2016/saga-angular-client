import {Component} from '@angular/core';
import {Clase} from "../../entities/clase";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {ClaseStore} from "../../services/clase.store";


@Component({
    templateUrl: 'app/components/clase/clase.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'clase',
    providers:[ClaseStore, ConfirmationService]
})
export class ClaseComponent {

    msgs: Message[] = [];

    displayDialog: boolean;

    clase: Clase= new Clase();

    isNew: boolean;

    constructor(private claseStore: ClaseStore,  private confirmationService : ConfirmationService) { }

    showDialogToAdd() {
        this.isNew = true;
        this.clase = new Clase();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.clase =new Clase(event.data);
        this.displayDialog = true;
    }

    save() {
        this.claseStore.save(this.clase).subscribe(
            guardada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity:'success',
                        summary:'Guardado',
                        detail:'Se ha guardado la clase con exito!'
                    })
            },
            error => {
                this.msgs.push(
                    {
                        severity:'error',
                        summary:'Error',
                        detail:'No se ha podido guardar la clase:\n' + error
                    });
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la clase?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
            accept: () => {
                this.claseStore.delete(this.clase).subscribe(
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

        this.claseStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.claseStore.setSorts([event]);
    }
}	/**
 * Created by Federico on 17/11/2016.
 */
