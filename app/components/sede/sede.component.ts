import {Component} from '@angular/core';
import {Sede} from '../../entities/sede';
import {SedeStore} from "../../services/sede.store";
import {Message} from "primeng/components/common/api";


@Component({
	templateUrl: 'app/components/sede/sede.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'sede',
	providers:[SedeStore]
})
export class SedeComponent {

	displayDialog: boolean;

    sede: Sede = new Sede();

    isNew = false;

    msgs: Message[] = [];

    constructor(private sedeStore: SedeStore) { }

    showDialogToAdd() {
        this.isNew = true;
        this.sede = new Sede();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.sede = new Sede(event.data);
        this.displayDialog = true;
    }

    save() {
        this.sedeStore.save(this.sede).subscribe(
            guardada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity:'success',
                        summary:'Guardado',
                        detail:'Se ha guardado la sede '+ guardada.nombre + ' con exito!'
                    })
            },
            error => {
                this.msgs.push(
                    {
                        severity:'error',
                        summary:'Error',
                        detail:'No se ha podido guardar la sede:\n' + error
                    });
            });
    }

	
    delete() {
        this.sedeStore.delete(this.sede).subscribe(
            borrada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity:'success',
                        summary:'Exito',
                        detail:'Se ha borrado la sede '+ borrada.nombre + ' con exito!'
                    })
            },
            error => {
                this.msgs.push(
                    {
                        severity:'error',
                        summary:'Error',
                        detail:'No se ha podido eliminar la sede:\n' + error
                    });
            }
        );
    }

    pageChange(event) {
        let qo = {
            size: event.rows,
            page: event.page + 1
        };
        console.log(qo);

        this.sedeStore.mergeQueryOptions(qo);
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
    }

    sort(event) {
        this.sedeStore.setSorts([event]);
    }
}	
