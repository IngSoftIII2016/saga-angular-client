import {Component} from '@angular/core';
import {Evento} from "../../entities/evento";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {EventoStore} from "../../services/evento.store";
import {Subject} from "rxjs";
import {AulaService} from "../../services/aula.service";
import {Aula} from "../../entities/aula";


@Component({
    templateUrl: 'app/components/evento/evento.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'evento',
    providers:[EventoStore, AulaService, ConfirmationService]
})
export class EventoComponent {

    msgs: Message[] = [];

    displayDialog: boolean;

    evento: Evento= new Evento();

    isNew: boolean;

    aulas: SelectItem[] = [];

    aulaSelected: SelectItem;

    private searchTerms = new Subject<string>();

    constructor(private eventoStore: EventoStore,  private aulaService: AulaService,  private confirmationService : ConfirmationService) { }

    ngOnInit() {
        var sel = this;
        this.aulaService.getAll().subscribe(aulas => {
            aulas.forEach(aula => {
                    sel.aulas.push({
                            label: aula.nombre, value: new Aula (aula)
                        }
                    )
                }
            )
        });
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.evento.setLikes(terms.length > 0 ? {fecha: '*'+terms+'*', hora_inicio: '*'+terms+'*', hora_fin: '*'+terms+'*', motivo: '*'+terms+'*'} : {}))
    }

    showDialogToAdd() {
        this.isNew = true;
        this.evento = new Evento();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.evento =new Evento(event.data);
        this.aulaSelected = {label: this.evento.aula.nombre, value: new Aula(this.evento.aula)};
        this.displayDialog = true;
    }

    save() {
        if (this.evento.aula.nombre != this.aulaSelected.label){
            this.evento.aula = new Aula (this.aulaSelected);
        }
        if (this.isNew) {
            this.evento.aula = new Aula (this.aulaSelected);
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar un evento?',
                header: 'Confirmar ',
                icon: 'fa fa-plus-square',
                accept: () => {
                    this.eventoStore.create(this.evento).subscribe(
                        creada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Creada',
                                    detail: 'Se ha agregado el evento ' + creada.aula.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido crear el evento:\n' + error
                                });
                        });
                }
            });
        }
        //update
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea modificar el evento?',
                header: 'Confirmar modificacion',
                icon: 'fa fa-pencil-square-o',
                accept: () => {
                    this.eventoStore.update(this.evento).subscribe(
                        guardada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Guardada',
                                    detail: 'Se han guardado los cambios a ' + guardada.aula.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido guardar el evento:\n' + error
                                });
                        });
                }
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

    message(evento: string) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Exito', detail: 'Evento ' + evento + ' con exito!'});
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
    search(term: string): void {
        this.searchTerms.next(term);
    }

}
/**
 * Created by Federico on 17/11/2016.
 */
/**
 * Created by Federico on 17/11/2016.
 */
