import {Component} from '@angular/core';
import {Carrera} from '../../entities/carrera';
import {CarreraStore} from "../../services/carrera.store";
import {Message, ConfirmationService} from "primeng/components/common/api";


@Component({
	templateUrl: 'app/components/carrera/carrera.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'carrera',
	providers:[CarreraStore,ConfirmationService]
})
export class CarreraComponent {

    carrera: Carrera = new Carrera();

    msgs: Message[] = [];

    isNew = false;

    displayDialog: boolean;

    constructor(private carreraStore: CarreraStore,  private confirmationService : ConfirmationService) { }

    showDialogToAdd() {
        this.isNew = true;
        this.carrera = new Carrera();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.carrera = new Carrera(event.data);
        this.displayDialog = true;
    }

    save() {
        this.carreraStore.save(this.carrera).subscribe(
            guardada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity:'success',
                        summary:'Guardado',
                        detail:'Se ha guardado la carrera '+ guardada.nombre + ' con exito!'
                    })
            },
            error => {
                this.msgs.push(
                    {
                        severity:'error',
                        summary:'Error',
                        detail:'No se ha podido guardar la carrera:\n' + error
                    });
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la carrera?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
            accept: () => {
                this.carreraStore.delete(this.carrera).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity:'success',
                                summary:'Exito',
                                detail:'Se ha borrado la carrera '+ borrada.nombre + ' con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity:'error',
                                summary:'Error',
                                detail:'No se ha podido eliminar la carrera:\n' + error
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

        this.carreraStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.carreraStore.setSorts([event]);
    }
}	
