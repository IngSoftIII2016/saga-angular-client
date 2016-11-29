import {Component} from '@angular/core';
import {Aula} from "../../entities/aula";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {AulaStore} from "../../services/aula.store";
import {EdificioService} from "../../services/edificio.service";
import {Edificio} from "../../entities/edificio";
import {Observable, Subject} from "rxjs";
import {forEach} from "@angular/router/src/utils/collection";
import {QueryOptions} from "../../services/generic.service";

@Component({
    templateUrl: 'app/components/aula/aula.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'aula',
    providers: [AulaStore, EdificioService, ConfirmationService]
})
export class AulaComponent {

    validaciones: Message[] = [];

    msgs: Message[] = [];

    displayDialog: boolean;

    aula: Aula = new Aula();

    isNew: boolean;

    edificios: SelectItem[] = [];

    edificioSelected: Edificio;

    private searchTerms = new Subject<string>();

    constructor(private aulaStore: AulaStore,
                private edificioService: EdificioService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        var sel = this;
        this.edificioService.getAll().subscribe(edificios => {
            edificios.forEach(edificio => {
                    sel.edificios.push({
                            label: edificio.nombre, value: new Edificio (edificio)
                        }
                    )
                }
            )
        });
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.aulaStore.setLikes(terms.length > 0 ? {nombre: '*'+terms+'*'} : {}))
    }

    showDialogToAdd() {
        this.isNew = true;
        this.aula = new Aula();
        this.displayDialog = true;
        this.edificioSelected = this.edificios[0].value;

    }

    onRowSelect(event) {
        this.isNew = false;
        this.aula = new Aula(event.data);
        this.edificioSelected = new Edificio(this.aula.edificio);
        this.displayDialog = true;
    }

    save() {
        if (!this.aula.nombre || !this.aula.capacidad) {
            this.validaciones[0] ={
                severity:'error',
                summary:'Error',
                detail:'Complete los campos requeridos'
            };
        }
        else {
            this.aula.edificio = new Edificio(this.edificioSelected);
            if (this.isNew)
                this.confirmationService.confirm({
                    message: 'Estas seguro que desea agregar el aula?',
                    header: 'Confirmar ',
                    icon: 'fa ui-icon-warning',
                    accept: () => {
                        this.aula.ubicacion = 0;
                        this.aulaStore.create(this.aula).subscribe(
                            creada => {
                                this.displayDialog = false;
                                this.msgs.push(
                                    {
                                        severity: 'success',
                                        summary: 'Creada',
                                        detail: 'Se ha agregado el aula ' + creada.nombre + ' con exito!'
                                    })
                            },
                            error => {
                                this.msgs.push(
                                    {
                                        severity: 'error',
                                        summary: 'Error',
                                        detail: 'No se ha podido crear el aula:\n' + error
                                    });
                            });
                    }
                });
            //update
            else
                this.confirmationService.confirm({
                    message: 'Estas seguro que desea modificar el aula?',
                    header: 'Confirmar modificacion',
                    icon: 'fa ui-icon-warning',
                    accept: () => {
                        this.aulaStore.update(this.aula).subscribe(
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
                                        detail: 'No se ha podido guardar el aula:\n' + error
                                    });
                            });
                    }
                });
        }
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar el aula?',
            header: 'Confirmar eliminacion',
            icon: 'fa ui-icon-delete',
            accept: () => {
                this.aulaStore.delete(this.aula).subscribe(
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
                                detail: 'No se ha podido eliminar el aula:\n' + error
                            });
                    }
                );
            }
        });
    }

    message(evento: string) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Exito', detail: 'Aula ' + evento + ' con exito!'});
    }

    pageChange(event) {
        let qo = {
            size: event.rows,
            page: event.page + 1
        };
        console.log(qo);

        this.aulaStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.aulaStore.setSorts([event]);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

}
/**
 * Created by Federico on 17/11/2016.
 */
