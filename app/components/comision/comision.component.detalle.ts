import {ComisionComponent} from "./comision.component";
import {Component, OnInit} from "@angular/core";
import {Comision} from "../../entities/comision";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ComisionStore} from "../../services/comision.store";
import {ComisionService} from "../../services/comision.service";
import {QueryOptions} from "../../commons/generic.service";
import {SelectItem, ConfirmationService, Message} from "primeng/components/common/api";
import {Asignatura} from "../../entities/asignatura";
import {Periodo} from "../../entities/periodo";
import {Docente} from "../../entities/docente";
import {AsignaturaService} from "../../services/asignatura.service";
import {PeriodoService} from "../../services/periodo.service";
import {DocenteService} from "../../services/docente.service";
import {CRUD} from "../../commons/crud";

/**
 * Created by sandro on 30/1/2017.
 */
@Component({

    templateUrl: 'app/components/comision/comision.component.detalle.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'comision-detalle'
})

export class ComisionComponentDetalle implements OnInit{

    asignaturas: SelectItem[] = [];

periodos: SelectItem[] = [];

docentes: SelectItem[] = [];
    error = '';

    asignaturasFilter: SelectItem[] = [];

    periodosFilter: SelectItem[] = [];

    docentesFilter: SelectItem[] = [];

constructor(private comisionStore: ComisionStore,
                private periodoService : PeriodoService,
                private asignaturaService : AsignaturaService,
                private comisionService : ComisionService,
                private route: ActivatedRoute,
                private docenteService : DocenteService,
                private confirmationService: ConfirmationService) {
    }

    comision : Comision;
    public msgs: Message[] = [];

    ngOnInit() {
        let self = this;
        //console.log("params: "+this.route.params['id']);
        this.route.params
        // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.comisionService.get(+params['id']))
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

    guardar()  {
        this.comisionService.update(this.comision).
        subscribe(result => {
            this.msgs.push(  {
                severity: 'success',
                summary: 'Guardada',
                detail: 'Se actualizaron los datos de la comision'
            })
        }, err => {
            this.msgs.push(  {
                severity: 'failed',
                summary: 'Error',
                detail: 'No se pudo actualizar los datos de la comision.'
            })

        });
    }

    borrar()  {
        this.comisionService.delete(this.comision).
        subscribe(result => {
            this.msgs.push(  {
                severity: 'success',
                summary: 'Eliminada',
                detail: 'Se elimino la comision'
            })
        }, err => {
            this.msgs.push(  {
                severity: 'failed',
                summary: 'Error',
                detail: 'No se pudo eliminar la comision, compruebe si tiene horarios asosicados.'
            })

        });
    }

}