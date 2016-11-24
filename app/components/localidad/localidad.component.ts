import {Component} from '@angular/core';
import {Localidad} from "../../entities/localidad";
import {LocalidadService} from "../../services/localidad.service";
import {QueryOptions} from "../../services/generic.service";
import {LocalidadStore} from "../../services/localidad.store";
import {SedeService} from "../../services/sede.service";
import {ConfirmationService, Message, SelectItem} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {Sede} from "../../entities/sede";

//class PrimeAsignatura implements Asignatura {
//    constructor(public id?, public nombre?, public carrera?) {}
//}

@Component({
    templateUrl: 'app/components/localidad/localidad.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'localidad',
    providers: [LocalidadStore, SedeService, ConfirmationService]
})

export class LocalidadComponent {

    msgs: Message[] = [];

    displayDialog: boolean;

    localidad: Localidad = new Localidad();

    isNew: boolean;

    sedes: SelectItem[] = [];

    sedeSelected: SelectItem;

    private searchTerms = new Subject<string>();

    constructor(private localidadStore: LocalidadStore,
                private sedeService: SedeService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        var sel = this;
        this.sedeService.getAll().subscribe(sedes => {
            sedes.forEach(sede => {
                    sel.sedes.push({
                            label: sede.nombre, value: new Sede (sede)
                        }
                    )
                }
            )
        });
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.localidadStore.setLikes(terms.length > 0 ? {nombre: '*'+terms+'*'} : {}))
    }

    showDialogToAdd() {
        this.isNew = true;
        this.localidad = new Localidad();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.localidad = new Localidad(event.data);
        this.sedeSelected = {label: this.localidad.sede.nombre, value: new Sede(this.localidad.sede)};
        this.displayDialog = true;
    }

    save() {
        if (this.localidad.sede.nombre != this.sedeSelected.label){
            this.localidad.sede = new Sede (this.sedeSelected);
        }
        if (this.isNew) {
            this.localidad.sede = new Sede (this.sedeSelected);
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar la localidad?',
                header: 'Confirmar ',
                icon: 'fa fa-plus-square',
                accept: () => {
                    this.localidadStore.create(this.localidad).subscribe(
                        creada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Creada',
                                    detail: 'Se ha agregado la localidad ' + creada.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido crear la localidad:\n' + error
                                });
                        });
                }
            });
        }
        //update
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea modificarla localidad?',
                header: 'Confirmar modificacion',
                icon: 'fa fa-pencil-square-o',
                accept: () => {
                    this.localidadStore.update(this.localidad).subscribe(
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
                                    detail: 'No se ha podido guardarla localidad:\n' + error
                                });
                        });
                }
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la localidad?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
            accept: () => {
                this.localidadStore.delete(this.localidad).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity: 'success',
                                summary: 'Borrado',
                                detail: 'Se ha borrado el ' + borrada.nombre + ' con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity: 'error',
                                summary: 'Error',
                                detail: 'No se ha podido eliminar la localidad:\n' + error
                            });
                    }
                );
            }
        });
    }

    message(evento: string) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Exito', detail: 'Localidad ' + evento + ' con exito!'});
    }

    pageChange(event) {
        let qo = {
            size: event.rows,
            page: event.page + 1
        };
        console.log(qo);

        this.localidadStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.localidadStore.setSorts([event]);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }


}	
