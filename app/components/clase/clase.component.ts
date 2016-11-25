import {Component} from '@angular/core';
import {Clase} from "../../entities/clase";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {ClaseStore} from "../../services/clase.store";
import {AulaService} from "../../services/aula.service";
import {Aula} from "../../entities/aula";
import {Subject, Timestamp} from "rxjs";
import {CALENDAR_LOCALE_ES} from "../commons/calendar-locale-es";


@Component({
    templateUrl: 'app/components/clase/clase.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'clase',
    providers:[ClaseStore,AulaService, ConfirmationService]
})
export class ClaseComponent {

    msgs: Message[] = [];

    displayDialog: boolean;

    clase: Clase= new Clase();

    isNew: boolean;

    aulas: SelectItem[] = [];

    aula : string;

    aulaSelected: SelectItem;


    fecha: Date;
    hora_inicio: Date;
    hora_fin: Date;
    es: any = CALENDAR_LOCALE_ES;

    private searchTerms = new Subject<string>();

    constructor(private claseStore: ClaseStore,   private aulaService: AulaService,private confirmationService : ConfirmationService) { }

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
                this.claseStore.setLikes(terms.length > 0 ? {
                    comentario: '*'+terms+'*',
                    'aula.nombre' : '*'+terms+'*',
                } : {}))
    }
    showDialogToAdd() {
        this.isNew = true;
        this.clase = new Clase();
        this.fecha = new Date();
        this.hora_inicio = new Date();
        this.hora_fin = new Date();
        this.displayDialog = true;
        this.aula = this.aulaSelected.label;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.clase =new Clase(event.data);
        this.fecha = new Date(this.clase.fecha);
        this.hora_inicio = this.clase.getHoraInicio();
        this.hora_fin = this.clase.getHoraFin();
        this.aulaSelected = {label: this.clase.aula.nombre, value: new Aula(this.clase.aula)};
        this.displayDialog = true;
        this.aula = this.clase.aula.nombre;
    }

    save() {
        this.clase.fecha = this.fecha.toISOString().split('T')[0];
        this.clase.hora_inicio = this.hora_inicio.toTimeString().split(' ')[0];
        this.clase.hora_fin = this.hora_fin.toTimeString().split(' ')[0];
       if (this.isNew) {
           if(this.aulaSelected == null)
               this.clase.aula = this.aulas[0].value;
           else
               this.clase.aula =  new Aula (this.aulaSelected.value);
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar una clase?',
                header: 'Confirmar ',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.claseStore.create(this.clase).subscribe(
                        creada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Creada',
                                    detail: 'Se ha agregado la clase ' + creada.aula.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido crear la clase:\n' + error
                                });
                        });
                }
            });
        }
        //update
        else {
           if (this.clase.aula.nombre == this.aulaSelected.label)
               this.clase.aula = new Aula(this.aulaSelected.value);
           else
               this.clase.aula = new Aula(this.aulaSelected);
           this.confirmationService.confirm({
               message: 'Estas seguro que desea modificar la clase?',
               header: 'Confirmar modificacion',
               icon: 'fa ui-icon-warning',
               accept: () => {
                   this.claseStore.update(this.clase).subscribe(
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
                                   detail: 'No se ha podido guardar la clase:\n' + error
                               });
                       });
               }
           });
       }
    }



    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la clase?',
            header: 'Confirmar eliminacion',
            icon: 'fa ui-icon-delete',
            accept: () => {
                this.claseStore.delete(this.clase).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity:'success',
                                summary:'Exito',
                                detail:'Se ha borrado la clase con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity:'error',
                                summary:'Error',
                                detail:'No se ha podido eliminar la clase:\n' + error
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

        this.claseStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.claseStore.setSorts([event]);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }
}	/**
 * Created by Federico on 17/11/2016.
 */
