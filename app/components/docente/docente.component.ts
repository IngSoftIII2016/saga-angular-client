import {Component} from '@angular/core';
import {Docente} from '../../entities/docente';
import {DocenteStore} from "../../services/docente.sotre";
import {Message, ConfirmationService} from "primeng/components/common/api";

/*class PrimeDocente implements Docente {
    constructor(public id?, public nombre?, public apellido?) {}
}
*/
@Component({
	templateUrl: 'app/components/docente/docente.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'docente',
	providers:[DocenteStore, ConfirmationService]
})
export class DocenteComponent {

    docente: Docente = new Docente();

    msgs: Message[] = [];

    isNew = false;

    displayDialog: boolean;

    constructor(private docenteStore: DocenteStore,  private confirmationService : ConfirmationService) { }

    showDialogToAdd() {
        this.isNew = true;
        this.docente = new Docente();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.docente =new Docente(event.data);
        this.displayDialog = true;
    }

    save() {
        this.docenteStore.save(this.docente).subscribe(
            guardada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity:'success',
                        summary:'Guardado',
                        detail:'Se ha guardado el docente '+ guardada.nombre + ' con exito!'
                    })
            },
            error => {
                this.msgs.push(
                    {
                        severity:'error',
                        summary:'Error',
                        detail:'No se ha podido guardar el docente:\n' + error
                    });
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar el docente?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
            accept: () => {
                this.docenteStore.delete(this.docente).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity:'success',
                                summary:'Exito',
                                detail:'Se ha borrado el docente '+ borrada.nombre + ' con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity:'error',
                                summary:'Error',
                                detail:'No se ha podido eliminar el docente:\n' + error
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

        this.docenteStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.docenteStore.setSorts([event]);
    }


}	
