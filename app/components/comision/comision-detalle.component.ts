import {Component, OnInit} from "@angular/core";
import {Comision} from "../../entities/comision";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ComisionStore} from "../../services/comision.store";
import {SelectItem, ConfirmationService, Message} from "primeng/components/common/api";
import {AsignaturaService} from "../../services/asignatura.service";
import {PeriodoService} from "../../services/periodo.service";
import {DocenteService} from "../../services/docente.service";
import {MessagesService} from "../../services/messages.service";

/**
 * Created by sandro on 30/1/2017.
 */
@Component({
    templateUrl: 'app/components/comision/comision-detalle.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'comision-detalle',
    providers: [ConfirmationService]
})

export class ComisionDetalleComponent implements OnInit {

    asignaturas: SelectItem[] = [];

    periodos: SelectItem[] = [];

    docentes: SelectItem[] = [];

    error = '';

    asignaturasFilter: SelectItem[] = [];

    periodosFilter: SelectItem[] = [];

    docentesFilter: SelectItem[] = [];

    constructor(private comisionStore: ComisionStore,
                private periodoService: PeriodoService,
                private asignaturaService: AsignaturaService,
                private route: ActivatedRoute,
                private router: Router,
                private docenteService: DocenteService,
                private confirmationService: ConfirmationService,
                private messagesService: MessagesService) {
    }

    comision: Comision;
    public msgs: Message[] = [];

    ngOnInit() {
        let self = this;
        //console.log("params: "+this.route.params['id']);
        this.route.params
        // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.comisionStore.service.get(+params['id']))
            .subscribe((comision: Comision) => this.comision = comision);

        this.asignaturaService.getAll().subscribe(asignaturas => {
            asignaturas.forEach(asignatura => {
                self.asignaturas.push({label: asignatura.nombre, value: asignatura});
                self.asignaturasFilter.push({label: asignatura.nombre, value: asignatura.id});
            });
            self.asignaturasFilter.unshift({label: 'Todas', value: null});
        });
        this.periodoService.getAll().subscribe(periodos => {
            periodos.forEach(periodo => {
                self.periodos.push({label: periodo.descripcion, value: periodo});
                self.periodosFilter.push({label: periodo.descripcion, value: periodo.id});
            });
            self.periodosFilter.unshift({label: 'Todos', value: null});
        });
        this.docenteService.getAll().subscribe(docentes => {
            docentes.forEach(docente => {
                let label = docente.apellido + ', ' + docente.nombre;
                self.docentes.push({label: label, value: docente});
                self.docentesFilter.push({label: label, value: docente.id});
            });
            self.docentesFilter.unshift({label: 'Todos', value: null});
        });
    }

    guardar() {
        this.comisionStore.update(this.comision).subscribe(result => {
            this.messagesService.showMessage({
                severity: 'success',
                summary: 'Guardada',
                detail: 'Se actualizaron los datos de la comision'
            })
            this.router.navigate(['administracion','comisiones']);
        }, err => {
            this.messagesService.showMessage({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo actualizar los datos de la comision.'
            });
        });
    }

    borrar() {
        this.comisionStore.delete(this.comision).subscribe(result => {
            this.messagesService.showMessage({
                severity: 'success',
                summary: 'Eliminada',
                detail: 'Se elimino la comision.'
            })
            this.router.navigate(['administracion','comisiones']);
        }, err => {
            let error = err.json().error;
            this.messagesService.showMessage({
                severity: 'error',
                summary: error.title,
                detail: 'No se pudo eliminar la comision. ' + error.detail
            })
        });


    }

}