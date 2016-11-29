import {Component} from '@angular/core';
import {Edificio} from '../../entities/edificio';
import {LocalidadService} from "../../services/localidad.service";
import {EdificioStore} from "../../services/edificio.store";
import {ConfirmationService, Message, SelectItem} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {Localidad} from "../../entities/localidad";

@Component({
	templateUrl: 'app/components/edificio/edificio.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'edificio',
	providers:[EdificioStore, LocalidadService, ConfirmationService]
})
export class EdificioComponent {


    validaciones: Message[] = [];

    msgs: Message[] = [];

    displayDialog: boolean;

    edificio: Edificio = new Edificio();

    isNew: boolean;

    localidades: SelectItem[] = [];

    localidadSelected: Localidad;

    private searchTerms = new Subject<string>();

    constructor(private edificioStore: EdificioStore,
                private localidadService: LocalidadService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        var sel = this;
        this.localidadService.getAll().subscribe(localidades => {
            localidades.forEach(localidad => {
                    sel.localidades.push({
                            label: localidad.nombre, value: new Localidad (localidad)
                        }
                    )
                }
            )
        });
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.edificioStore.setLikes(terms.length > 0 ? {nombre: '*'+terms+'*'} : {}))
    }

    showDialogToAdd() {
        this.isNew = true;
        this.edificio = new Edificio();
        this.displayDialog = true;
        this.localidadSelected =  new Localidad(this.localidades[0].value);

    }

    onRowSelect(event) {
        this.isNew = false;
        this.edificio = new Edificio(event.data);
        this.localidadSelected =  new Localidad(this.edificio.localidad);
        this.displayDialog = true;
    }

    save() {
        if(!this.edificio.nombre ){
            this.validaciones[0] ={
                severity:'error',
                summary:'Error',
                detail:'Complete los campos requeridos'
            };
        }
        else {
        this.edificio.localidad = new Localidad(this.localidadSelected);
        if (this.isNew)
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar el edificio?',
                header: 'Confirmar ',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.edificioStore.create(this.edificio).subscribe(
                        creada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Creada',
                                    detail: 'Se ha agregado el edificio ' + creada.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido crear el edificio:\n' + error
                                });
                        });
                }
            });
        //update
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea modificar el edificio?',
                header: 'Confirmar modificacion',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.edificioStore.update(this.edificio).subscribe(
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
                                    detail: 'No se ha podido guardar el edificio:\n' + error
                                });
                        });
                }
            });
    }
    }

    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar el edificio?',
            header: 'Confirmar eliminacion',
            icon: 'fa ui-icon-delete',
            accept: () => {
                this.edificioStore.delete(this.edificio).subscribe(
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
                                detail: 'No se ha podido eliminar el edificio:\n' + error
                            });
                    }
                );
            }
        });
    }

    message(evento: string) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Exito', detail: 'Edificio ' + evento + ' con exito!'});
    }

    pageChange(event) {
        let qo = {
            size: event.rows,
            page: event.page + 1
        };
        console.log(qo);

        this.edificioStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.edificioStore.setSorts([event]);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }
}