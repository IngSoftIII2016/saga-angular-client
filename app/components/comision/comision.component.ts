import {Component} from '@angular/core';
import {Comision} from "../../entities/comision";
import {ConfirmationService, SelectItem} from "primeng/components/common/api";
import {ComisionStore} from "../../services/comision.store";
import {AsignaturaService} from "../../services/asignatura.service";
import {Asignatura} from "../../entities/asignatura";
import {PeriodoService} from "../../services/periodo.service";
import {Periodo} from "../../entities/periodo";
import {DocenteService} from "../../services/docente.service";
import {Docente} from "../../entities/docente";
import {CRUD} from "../../commons/crud";
import {ComisionService} from "../../services/comision.service";


@Component({
    templateUrl: 'app/components/comision/comision.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'comision',
    providers:[ComisionStore, AsignaturaService, PeriodoService,DocenteService, ConfirmationService]
})
export class ComisionComponent extends CRUD<Comision, ComisionService, ComisionStore> {


    asignaturas: SelectItem[] = [];

    //asignaturaSelected: Asignatura;

    periodos: SelectItem[] = [];

    //periodoSelected: Periodo;

    docentes: SelectItem[] = [];

    //docenteSelected: Docente;

    constructor(private comisionStore: ComisionStore,
                private asignaturaService: AsignaturaService,
                private periodoService: PeriodoService,
                private docenteService: DocenteService,
                private confirmationService : ConfirmationService)
    {
        super(comisionStore, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        var self = this;
        this.asignaturaService.getAll().subscribe(asignaturas => {
            self.asignaturas = asignaturas.map(asignatura => {
                    return { label: asignatura.nombre, value: asignatura }
                }
            )
        });
        this.periodoService.getAll().subscribe(periodos => {
            this.periodos = periodos.map(periodo => {
                    return { label: periodo.descripcion, value: periodo }
                }
            )
        });
        this.docenteService.getAll().subscribe(docentes => {
            this.docentes = docentes.map(docente => {
                    return { label: docente.apellido + ', ' + docente.nombre, value: docente }
                }
            )
        });
    }

    protected getDefaultNewEntity(): Comision {
        return new Comision({
            asignatura: this.asignaturas[0].value as Asignatura,
            periodo: this.periodos[0].value as Periodo,
            docente: this.docentes[0].value as Docente
        });
    }

    protected getEntityFromEvent(event: any): Comision {
        return new Comision(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'la comision ' + this.entity.asignatura.nombre + ' ' + this.entity.nombre;
    }

    protected getSearchFields(): string[] {
        return ['nombre', 'asignatura.nombre', 'periodo.descripcion', 'docente.nombre', 'docente.apellido']
    }
/*
    showDialogToAdd() {
        this.asignaturaSelected = this.asignaturas[0].value as Asignatura;
        this.periodoSelected = this.periodos[0].value as Periodo;
        this.docenteSelected = this.docentes[0].value as Docente;
        super.showDialogToAdd();
    }
*/
/*
    protected onSelect(comision: Comision): void {
        this.asignaturaSelected = comision.asignatura;
        this.periodoSelected = comision.periodo;
        this.docenteSelected = comision.docente;

    }
*/
/*
    protected onCreate(comision: Comision): Comision {
        comision.asignatura = this.asignaturaSelected;
        comision.periodo = this.periodoSelected;
        comision.docente = this.docenteSelected;
        return comision;
    }
*/
/*
    protected onUpdate(comision: Comision): Comision {
        comision.asignatura = this.asignaturaSelected;
        comision.periodo = this.periodoSelected;
        comision.docente = this.docenteSelected;
        return comision;
    }
*/
}	/**
 * Created by Federico on 17/11/2016.
 */
