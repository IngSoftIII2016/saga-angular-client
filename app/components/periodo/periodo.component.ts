import {Component} from '@angular/core';
import {Periodo} from '../../entities/periodo';
import {PeriodoStore} from "../../services/periodo.store";
import {CALENDAR_LOCALE_ES} from "../commons/calendar-locale-es";
import {ConfirmationService, Message} from "primeng/components/common/api";


@Component({
	templateUrl: 'app/components/periodo/periodo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'periodo',
	providers:[PeriodoStore, ConfirmationService]
})
export class PeriodoComponent {

    msgs: Message[] = [];

	displayDialog: boolean = false;

    periodo: Periodo = new Periodo();

    isNew: boolean;

    fechaInicio: Date;
    fechaFin: Date;

    es: any = CALENDAR_LOCALE_ES;

    constructor(
        private periodoStore: PeriodoStore,
        private confirmationService: ConfirmationService) { }

    showDialogToAdd() {
        this.isNew = true;
        this.periodo = new Periodo();
        this.fechaInicio = new Date();
        this.fechaFin = new Date();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.periodo = new Periodo(event.data);
        this.fechaInicio = new Date(this.periodo.fecha_inicio);
        this.fechaFin = new Date(this.periodo.fecha_fin)
        this.displayDialog = true;
    }
    save() {
        this.periodo.fecha_inicio = this.fechaInicio.toISOString().split('T')[0];
        this.periodo.fecha_fin= this.fechaFin.toISOString().split('T')[0];

        if (this.isNew) {
            this.periodoStore.create(this.periodo)
                .subscribe(
                    creada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity: 'success',
                                summary: 'Creado',
                                detail: 'Se ha creado el periodo ' + creada.descripcion + ' con éxito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity: 'error',
                                summary: 'Error',
                                detail: 'No se ha podido crear el periodo:\n' + error
                            });
                    });
        }

        //update
        else
            this.confirmationService.confirm({
                message: '¿esta seguro que desea modificar el periodo?',
                header: 'Confirmar modificación',
                icon: 'fa fa-pencil-square-o',
                accept: () => {
                    this.periodoStore.update(this.periodo).subscribe(
                        guardada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Guardada',
                                    detail: 'Se han guardado los cambios a ' + guardada.descripcion + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido guardar el periodo:\n' + error
                                });
                        });
                }
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: '¿esta seguro que desea eliminar el aula?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
            accept: () => {
                this.periodoStore.delete(this.periodo).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity: 'success',
                                summary: 'Borrado',
                                detail: 'Se ha borrado el periodo ' + borrada.descripcion + ' con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity: 'error',
                                summary: 'Error',
                                detail: 'No se ha podido eliminar el periodo:\n' + error
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

        this.periodoStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.periodoStore.setSorts([event]);
    }

}	
