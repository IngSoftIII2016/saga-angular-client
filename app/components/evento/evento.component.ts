import {Component} from '@angular/core';
import {Evento} from "../../entities/evento";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {EventoStore} from "../../services/evento.store";


@Component({
    templateUrl: 'app/components/evento/evento.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'evento',
    providers:[EventoStore, ConfirmationService]
})
export class EventoComponent {

    msgs: Message[] = [];

    displayDialog: boolean;

    evento: Evento= new Evento();

    isNew: boolean;

    constructor(private eventoStore: EventoStore,  private confirmationService : ConfirmationService) { }

    showDialogToAdd() {
        this.isNew = true;
        this.evento = new Evento();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.evento =new Evento(event.data);
        this.displayDialog = true;
    }

    save() {
        this.eventoStore.save(this.evento).subscribe(
            guardada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity:'success',
                        summary:'Guardado',
                        detail:'Se ha guardado el evento '+ guardada.motivo + ' con exito!'
                    })
            },
            error => {
                this.msgs.push(
                    {
                        severity:'error',
                        summary:'Error',
                        detail:'No se ha podido guardar el evento:\n' + error
                    });
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar el evento?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
            accept: () => {
                this.eventoStore.delete(this.evento).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity:'success',
                                summary:'Exito',
                                detail:'Se ha borrado el evento '+ borrada.motivo + ' con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity:'error',
                                summary:'Error',
                                detail:'No se ha podido eliminar el evento:\n' + error
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

        this.eventoStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.eventoStore.setSorts([event]);
    }

}
/**
 * Created by Federico on 17/11/2016.
 */
/**
 * Created by Federico on 17/11/2016.
 */
