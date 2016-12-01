import {Component} from '@angular/core';
import {Docente} from '../../entities/docente';
import {DocenteStore} from "../../services/docente.sotre";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {Subject} from "rxjs";

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

    validaciones: Message[] = [];

    msgs: Message[] = [];

    isNew = false;

    displayDialog: boolean;

    private searchTerms = new Subject<string>();

    constructor(private docenteStore: DocenteStore,  private confirmationService : ConfirmationService) { }

    ngOnInit() {
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.docenteStore.setLikes(terms.length > 0 ? {apellido: '*'+terms+'*', nombre: '*'+terms+'*'} : {}))
    }

    showDialogToAdd() {
        this.validaciones = [];
        this.isNew = true;
        this.docente = new Docente();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.validaciones = [];
        this.isNew = false;
        this.docente =new Docente(event.data);
        this.displayDialog = true;
    }

    save() {
        if(!this.docente.nombre || !this.docente.apellido){
            this.validaciones[0] ={
                severity:'error',
                summary:'Error',
                detail:'Complete los campos requeridos'
            };
        }
        else
        if (this.isNew) {
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar el docente?',
                header: 'Confirmar ',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.docenteStore.create(this.docente).subscribe(
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
            });
        }
        //update
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea modificar el docente?',
                header: 'Confirmar modificacion',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.docenteStore.update(this.docente).subscribe(
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
                                    summary: 'Error',
                                    detail: 'No se ha podido guardar el docente:\n' + error
                                });
                        });
                }
            });

    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar el docente?',
            header: 'Confirmar eliminacion',
            icon: 'fa ui-icon-delete',
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

    search(term: string): void {
        this.searchTerms.next(term);
    }

}	
