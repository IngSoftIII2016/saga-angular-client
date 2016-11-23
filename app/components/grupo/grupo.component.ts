import {Component} from '@angular/core';
import {Grupo} from "../../entities/grupo";
import {GrupoService} from "../../services/grupo.service";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {GrupoStore} from "../../services/grupo.store";



@Component({
    templateUrl: 'app/components/grupo/grupo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'grupo',
    providers: [GrupoStore, ConfirmationService]
})
export class GrupoComponent {

    grupo: Grupo = new Grupo();

    msgs: Message[] = [];

    isNew = false;

    displayDialog: boolean;

    constructor(private grupoStore: GrupoStore,  private confirmationService : ConfirmationService) { }



    showDialogToAdd() {
        this.isNew = true;
        this.grupo = new Grupo();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.grupo =new Grupo(event.data);
        this.displayDialog = true;
    }

    save() {
        this.grupoStore.save(this.grupo).subscribe(
            guardada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity:'success',
                        summary:'Guardado',
                        detail:'Se ha guardado el grupo '+ guardada.nombre + ' con exito!'
                    })
            },
            error => {
                this.msgs.push(
                    {
                        severity:'error',
                        summary:'Error',
                        detail:'No se ha podido guardar el grupo:\n' + error
                    });
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar el grupo?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
            accept: () => {
                this.grupoStore.delete(this.grupo).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity:'success',
                                summary:'Exito',
                                detail:'Se ha borrado el grupo '+ borrada.nombre + ' con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity:'error',
                                summary:'Error',
                                detail:'No se ha podido eliminar el grupo:\n' + error
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

        this.grupoStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.grupoStore.setSorts([event]);
    }

}
