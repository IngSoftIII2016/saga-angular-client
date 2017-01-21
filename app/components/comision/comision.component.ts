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
    providers: [ComisionStore, AsignaturaService, PeriodoService, DocenteService, ConfirmationService]
})
export class ComisionComponent extends CRUD<Comision, ComisionService, ComisionStore> {


    asignaturas: SelectItem[] = [];

    periodos: SelectItem[] = [];

    docentes: SelectItem[] = [];

    asignaturasFilter: SelectItem[] = [];

    periodosFilter: SelectItem[] = [];

    docentesFilter: SelectItem[] = [];

    asignaturaFilter: Asignatura;

    periodoFilter: Periodo;

    docenteFilter: Docente;

    isFilter: boolean = false;


    constructor(private comisionStore: ComisionStore,
                private asignaturaService: AsignaturaService,
                private periodoService: PeriodoService,
                private docenteService: DocenteService,
                private confirmationService: ConfirmationService) {
        super(comisionStore, confirmationService);
    }


    protected toggleFilter() {
        this.isFilter = !this.isFilter;
    }

    ngOnInit() {
        super.ngOnInit();
        let self = this;

        // No era necesario pagarle al backend 2 veces para armar los dos arreglos de SelectItem
        this.asignaturaService.getAll().subscribe(asignaturas => {
            asignaturas.forEach(asignatura => {
                self.asignaturas.push({label: asignatura.nombre, value: asignatura});
                self.asignaturasFilter.push({label: asignatura.nombre, value: asignatura.id});
            });
            self.asignaturasFilter.unshift({label: 'Todas', value: null});
            self.asignaturaFilter = self.asignaturasFilter[0].value;
        });
        this.periodoService.getAll().subscribe(periodos => {
            periodos.forEach(periodo => {
                self.periodos.push({label: periodo.descripcion, value: periodo});
                self.periodosFilter.push({label: periodo.descripcion, value: periodo.id});
            });
            self.periodosFilter.unshift({label: 'Todos', value: null});
            self.periodoFilter = self.periodosFilter[0].value;
        });
        this.docenteService.getAll().subscribe(docentes => {
            docentes.forEach(docente => {
                let label = docente.apellido + ', ' + docente.nombre;
                self.docentes.push({label: label, value: docente});
                self.docentesFilter.push({label: label, value: docente.id});
            });
            self.docentesFilter.unshift({label: 'Todos', value: null});
            self.docenteFilter = self.docentesFilter[0].value;
        });

        /*
         this.asignaturaService.getAll().subscribe(asignaturas => {
         self.asignaturas = asignaturas.map(asignatura => {
         return { label: asignatura.nombre, value: asignatura }
         });
         });
         this.periodoService.getAll().subscribe(periodos => {
         self.periodos = periodos.map(periodo => {
         return { label: periodo.descripcion, value: periodo }
         });
         });
         this.docenteService.getAll().subscribe(docentes => {
         self.docentes = docentes.map(docente => {
         return { label: docente.apellido + ', ' + docente.nombre, value: docente }
         });
         });
         */
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

    protected getEntityReferencedLabel(entity): string {
        console.log(entity);
        return 'la comision ' + entity.nombre + ' para asignatura ' + entity.asignatura.nombre;
    }

    protected getSearchFields(): string[] {
        return ['nombre', 'asignatura.nombre', 'periodo.descripcion', 'docente.nombre', 'docente.apellido']
    }

}
/**
 * Created by Federico on 17/11/2016.
 */
