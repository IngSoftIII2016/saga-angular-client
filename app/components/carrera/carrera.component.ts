import {Component} from '@angular/core';
import {Carrera} from '../../entities/carrera';
import {CarreraStore} from "../../services/carrera.store";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {Subject} from "rxjs";


@Component({
	templateUrl: 'app/components/carrera/carrera.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'carrera',
	providers:[CarreraStore,ConfirmationService]
})
export class CarreraComponent {

    carrera: Carrera = new Carrera();

    validaciones: Message[] = [];

    msgs: Message[] = [];

    isNew = false;

    displayDialog: boolean;

    private searchTerms = new Subject<string>();

    constructor(private carreraStore: CarreraStore,  private confirmationService : ConfirmationService) { }

    ngOnInit() {
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.carreraStore.setLikes(terms.length > 0 ? {nombre: '*'+terms+'*'} : {}))
    }

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
        if(this.carrera.nombre== undefined ){
            this.validaciones[0] ={
                severity:'error',
                summary:'Error',
                detail:'Complete los campos requeridos'
            };
        }
        else
        if (this.isNew) {
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar la carrera?',
                header: 'Confirmar ',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.carreraStore.create(this.carrera).subscribe(
                        creada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Creada',
                                    detail: 'Se ha agregado la carrera ' + creada.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido crear la carrera:\n' + error
                                });
                        });
                }
            });
        }
        //update
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea modificar la carrera?',
                header: 'Confirmar modificacion',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.carreraStore.update(this.carrera).subscribe(
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
                                    detail: 'No se ha podido guardar la carrera:\n' + error
                                });
                        });
                }
            });
    }



    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la carrera?',
            header: 'Confirmar eliminacion',
            icon: 'fa ui-icon-delete',
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

    search(term: string): void {
        this.searchTerms.next(term);
    }
}	
