import {ComisionComponent} from "./comision.component";
import {Component} from "@angular/core";
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Comision} from "../../entities/comision";
import {ComisionService} from "../../services/comision.service";
import {ComisionStore} from "../../services/comision.store";
import {SelectItem, ConfirmationService} from "primeng/components/common/api";
import {CRUD} from "../../commons/crud";
import {Asignatura} from "../../entities/asignatura";
import {Periodo} from "../../entities/periodo";
import {Docente} from "../../entities/docente";
import {AsignaturaService} from "../../services/asignatura.service";
import {PeriodoService} from "../../services/periodo.service";
import {DocenteService} from "../../services/docente.service";
import {MessagesService} from "../../services/messages.service";
/**
 * Created by sandro on 30/1/2017.
 */

@Component({

    templateUrl: 'app/components/comision/comision-maestro.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'comision-alta',
    providers:[ComisionStore, ConfirmationService]

})

export class ComisionMaestroComponent extends CRUD<Comision, ComisionService, ComisionStore> {


    protected onAfterCreate(entity: Comision): void {
        super.onAfterCreate(entity);
        this.displayDialog = false;
        this.router.navigate(['detalle', entity.id], {relativeTo: this.route});
    }

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

    isInsert: boolean = false;

    isVisibleMenssaje: boolean = false;



    protected onOpenDialog(entity): void {
        super.onOpenDialog(entity);
        if(!this.isInsert) {
            this.router.navigate(['detalle', entity.id], {relativeTo: this.route});
        }
    }

    insert() : void {
        this.isInsert = true;
        this.showDialogToAdd();
        this.isInsert = false;
    }

    constructor(private comisionStore: ComisionStore,
                private asignaturaService: AsignaturaService,
                private periodoService: PeriodoService,
                private docenteService: DocenteService,
                private route: ActivatedRoute,
                private router: Router,
                messagesService: MessagesService,
                private confirmationService: ConfirmationService) {
        super(comisionStore, messagesService, confirmationService);
    }


    protected toggleFilter() {
        this.isFilter = !this.isFilter;
    }

    ngOnInit() {
        super.ngOnInit();
        let self = this;

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
        return 'la comision ' + entity.nombre + ' para asignatura ' + entity.asignatura.nombre;
    }

    protected getEntityName(entity): string {
        return ' la comision ' ;
    }

    protected getSearchFields(): string[] {
        return ['nombre', 'asignatura.nombre', 'periodo.descripcion', 'docente.nombre', 'docente.apellido']
    }

}