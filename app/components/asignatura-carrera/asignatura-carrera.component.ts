/**
 * Created by juan on 24/11/16.
 */
import {Component} from '@angular/core';
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {AsignaturaCarreraStore} from "../../services/asignatura-carrera.store";
import {CarreraService} from "../../services/carrera.service";
import {Carrera} from "../../entities/carrera";
import {Subject} from "rxjs";
import {AsignaturaService} from "../../services/asignatura.service";
import {Asignatura} from "../../entities/asignatura";
import {CRUD} from "../../commons/crud";
import {AsignaturaCarreraService} from "../../services/asignatura-carrera.service";
import {AsignaturaCarrera} from "../../entities/asignatura-carrera";

@Component({
    templateUrl: 'app/components/asignatura-carrera/asignatura-carrera.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'asignatura-carrera',
    providers: [AsignaturaCarreraStore, CarreraService, AsignaturaService, ConfirmationService]
})
export class AsignaturaCarreraComponent extends CRUD<AsignaturaCarrera, AsignaturaCarreraService, AsignaturaCarreraStore> {

    carreras: SelectItem[] = [];

    carrera: Carrera;

    asignaturas: SelectItem[] = [];

    regimenes: SelectItem[] = [];

    regimenesTabla = [];

    isFilter: boolean = false;

    anios: SelectItem[] = [];

    constructor(private asignaturaCarreraStore: AsignaturaCarreraStore,
                private carreraService: CarreraService,
                private asignaturaService: AsignaturaService,
                private confirmationService: ConfirmationService) {
        super(asignaturaCarreraStore, confirmationService);
    }

    protected toggleFilter() {
        this.isFilter = !this.isFilter;
    }

    onOpenDialog(entity: AsignaturaCarrera) {
        entity.carrera = this.carrera;
    }

    ngOnInit() {
        super.ngOnInit();
        let self = this;
        this.carreraService.getAll().subscribe(carreras => {
            self.carreras = carreras.map(carrera => {
                return {label: carrera.nombre, value: carrera}
            })
            self.carrera = carreras[0];
            self.filtrarCarrera();
        });
        this.asignaturaService.getAll().subscribe(asignaturas => {
            self.asignaturas = asignaturas.map(asignatura => {
                return {label: asignatura.nombre, value: asignatura.id}
            });
            self.asignaturas.unshift({label: 'Todas', value: null});
        });


        self.regimenes.push({label: 'Todos', value: null});
        self.regimenes.push({label: 'Primer Cuatrimestre', value: '1C'});
        self.regimenes.push({label: 'Segundo Cuatrimestre', value: '2C'});
        self.regimenes.push({label: 'Cuatrimestral', value: 'C'});
        self.regimenes.push({label: 'Anual', value: 'Anual'});
        self.regimenesTabla['1C'] = 'Primer Cuatrimestre';
        self.regimenesTabla['2C'] = 'Segundo Cuatrimestre';
        self.regimenesTabla['C'] = 'Cuatrimestral';
        self.regimenesTabla['Anual'] = 'Anual';

        this.anios.push({label: 'Todos', value: null});
        for (let i = 1; i < 7; i++)
            this.anios.push({label: i.toString(), value: i});
    }

    protected getDefaultNewEntity(): AsignaturaCarrera {
        return new AsignaturaCarrera({
            carrera: this.carreras[0].value as Carrera,
            asignatura: this.asignaturas[0].value as Asignatura
        });
    }

    protected getEntityFromEvent(event: any): AsignaturaCarrera {
        return new AsignaturaCarrera(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'el plan de estudio de la carrera ' + this.entity.carrera.nombre + ' y la asignatura ' + this.entity.asignatura.nombre;
    }

    protected getSearchFields(): string[] {
        return ['carrera.nombre', 'asignatura.nombre', 'anio', 'regimen']
    }

    public filtrarCarrera() : void {
        this.filter('carrera.id', this.carrera.id);
    }

}