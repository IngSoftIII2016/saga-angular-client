/**
 * Created by juan on 24/11/16.
 */
import {Component} from '@angular/core';
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {AsignaturaCarrera} from "../../entities/asignatura-carrera";
import {AsignaturaCarreraStore} from "../../services/asignatura-carrera.store";
import {CarreraService} from "../../services/carrera.service";
import {Carrera} from "../../entities/carrera";
import {Subject} from "rxjs";
import {AsignaturaService} from "../../services/asignatura.service";
import {Asignatura} from "../../entities/asignatura";

@Component({
    templateUrl: 'app/components/asignatura-carrera/asignatura-carrera.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'asignatura-carrera',
    providers: [AsignaturaCarreraStore, CarreraService,AsignaturaService, ConfirmationService]
})
export class AsignaturaCarreraComponent {

    validaciones: Message[] = [];

    msgs: Message[] = [];

    displayDialog: boolean;

    asignaturaCarrera: AsignaturaCarrera = new AsignaturaCarrera();

    carreras: SelectItem[] = [];

    carreraSelected: Carrera;

    asignaturas: SelectItem[] = [];

    asignaturaSelected: Asignatura;

    isNew: boolean;

    diseable : boolean;

    regimenes: SelectItem[] = [];

    regimenesTabla = new Array();

    regimenSelected: string;

    private searchTerms = new Subject<string>();

    constructor(private asignaturaCarreraStore: AsignaturaCarreraStore,
                private carreraService: CarreraService,
                private asignaturaService: AsignaturaService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        var sel = this;
        this.carreraService.getAll().subscribe(carreras => {
            carreras.forEach(carrera => {
                    sel.carreras.push({
                            label: carrera.nombre, value: new Carrera(carrera)
                        }
                    )
                }
            )
        });
        this.asignaturaService.getAll().subscribe(asignaturas => {
            asignaturas.forEach(asignatura => {
                    sel.asignaturas.push({
                            label: asignatura.nombre, value: new Asignatura(asignatura)
                        }
                    )
                }
            )
        });
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.asignaturaCarreraStore.setLikes(
                    terms.length > 0 ?
                        {'asignatura.nombre': '*'+terms+'*', 'carrera.nombre': '*'+terms+'*'} :
                        {}))
        sel.regimenes.push({label: 'Primer Cuatrimestre', value: '1C'});
        sel.regimenes.push({label: 'Segundo Cuatrimestre', value: '2C'});
        sel.regimenes.push({label: 'Cuatrimestral', value: 'C'});
        sel.regimenes.push({label: 'Anual', value: 'Anual'});
        sel.regimenesTabla['1C'] = 'Primer Cuatrimestre';
        sel.regimenesTabla['2C'] = 'Segundo Cuatrimestre';
        sel.regimenesTabla['C'] = 'Cuatrimestral';
        sel.regimenesTabla['Anual'] = 'Anual';


    }


    showDialogToAdd() {
        this.validaciones = [];
        this.isNew = true;
        this.asignaturaCarrera = new AsignaturaCarrera();
        this.displayDialog = true;
        this.carreraSelected =  new Carrera(this.carreras[0].value);
        this.asignaturaSelected =  new Asignatura(this.asignaturas[0].value);
        this.regimenSelected = this.regimenes[0].value;
        this.diseable = false;
    }

    onRowSelect(event) {
        this.validaciones = [];
        this.isNew = false;
        this.asignaturaCarrera = new AsignaturaCarrera(event.data);
        this.regimenSelected = this.asignaturaCarrera.regimen;
        this.carreraSelected =  new Carrera(this.asignaturaCarrera.carrera);
        this.asignaturaSelected =  new Asignatura(this.asignaturaCarrera.asignatura);
        this.displayDialog = true;
        this.diseable = true;
    }

    save() {
        if( !this.asignaturaCarrera.anio || !this.asignaturaCarrera.regimen ){
            this.validaciones[0] ={
                severity:'error',
                summary:'Error',
                detail:'Complete los campos requeridos'
            };
        }
        else {
            this.asignaturaCarrera.carrera = new Carrera(this.carreraSelected);
            this.asignaturaCarrera.asignatura = new Asignatura(this.asignaturaSelected);
            if (this.isNew)
                this.confirmationService.confirm({
                    message: 'Estas seguro que desea asignar la carrera a esta materia?',
                    header: 'Confirmar ',
                    icon: 'fa ui-icon-warning',
                    accept: () => {
                            this.asignaturaCarreraStore.create(this.asignaturaCarrera)
                                .subscribe(
                                    creada => {
                                        this.displayDialog = false;
                                        this.msgs.push(
                                            {
                                                severity: 'success',
                                                summary: 'Creada',
                                                detail: 'Se ha agregado la carrera ' + creada.carrera.nombre + ' con exito!'
                                            })
                                    },
                                    error => {
                                        this.msgs.push(
                                            {
                                                severity: 'error',
                                                summary: 'Error',
                                                detail: 'No se ha podido guardar los cambios:\n' + error
                                            });
                                    });
                        }
                });
            //update
            else
                this.confirmationService.confirm({
                    message: 'Estas seguro que desea modificar la relacion?',
                    header: 'Confirmar modificacion',
                    icon: 'fa ui-icon-warning',
                    accept: () => {
                        this.asignaturaCarreraStore.update(this.asignaturaCarrera).subscribe(
                            guardada => {
                                this.displayDialog = false;
                                this.msgs.push(
                                    {
                                        severity: 'success',
                                        summary: 'Guardada',
                                        detail: 'Se han guardado los cambios a ' + guardada.asignatura.nombre + ' con exito!'
                                    })
                            },
                            error => {
                                this.msgs.push(
                                    {
                                        severity: 'error',
                                        summary: 'Error',
                                        detail: 'No se ha podido guardar los cambios:\n' + error
                                    });
                            });
                    }
                });
        }
    }

    delete() {
        console.log(this.asignaturaCarrera);
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la relacion asignatura carrera?',
            header: 'Confirmar eliminacion',
            icon: 'fa ui-icon-delete',
            accept: () => {
                console.log(this.asignaturaCarrera);
                this.asignaturaCarreraStore.delete(this.asignaturaCarrera).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity: 'success',
                                summary: 'Borrado',
                                detail: 'Se ha borrado la relacion con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity: 'error',
                                summary: 'Error',
                                detail: 'No se ha podido eliminar:\n' + error
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

        this.asignaturaCarreraStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.asignaturaCarreraStore.setSorts([event]);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

}