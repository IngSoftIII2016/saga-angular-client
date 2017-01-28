import {Component, ViewChild} from '@angular/core';
import {Clase} from "../../entities/clase";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {Aula} from "../../entities/aula";
import {Subject, Timestamp, Observable} from "rxjs";
import {CALENDAR_LOCALE_ES} from "../../commons/calendar-locale-es";
import {CRUD} from "../../commons/crud";
import {ClaseService} from "../../services/clase.service";
import {ClaseStore} from "../../services/clase.store";
import {AulaService} from "../../services/aula.service";
import {Comision} from "../../entities/comision";
import {ComisionService} from "../../services/comision.service";
import {PeriodoService} from "../../services/periodo.service";
import {Periodo} from "../../entities/periodo";
import {UIChart} from "primeng/components/chart/chart";


@Component({
    templateUrl: 'app/components/presentismo/presentismo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'presentismo',
    providers: [ClaseStore]
})
export class PresentismoComponent extends CRUD<Clase, ClaseService, ClaseStore> {

    @ViewChild(UIChart)
    private chart: UIChart;

    periodos: SelectItem[] = [];

    periodo: Periodo;

    comisiones: SelectItem[] = [];

    comision: Comision;

    private tolerancia = new Subject<number>();

    periodoIdFilterSubject = new Subject<number>();

    toleranciaActual: number = 5;

    cantidadTotal: number;

    cantidadATiempo: number;

    cantidadTarde: number;

    cantidadAusente: number;

    data: any;

    es: any = CALENDAR_LOCALE_ES;

    constructor(private claseStore: ClaseStore,
                private comisionService: ComisionService,
                private periodoService: PeriodoService) {
        super(claseStore);
        claseStore.setPage(-1);
    }

    ngOnInit() {
        super.ngOnInit();
        var self = this;
        this.comisionService.getAll().subscribe(comisiones => {
            self.comisiones = comisiones.map(comision => {
                return {label: comision.etiqueta(), value: comision};
            });
        });
        this.periodoIdFilterSubject
            .switchMap(periodoId => {
                if (periodoId) { //Selecciono uno distinto de 'todos'
                    let qo = self.comisionService.getDefaultQueryOptions();
                    qo.merge({filters: {'periodo.id': periodoId}, page: -1});
                    return self.comisionService.query(qo);
                } else //todos
                    return self.comisionService.getAll()
            })
            .subscribe(comisiones => { //Actualizo las comisiones
                self.comisiones = comisiones.map(comision => {
                    return {label: comision.etiqueta(), value: comision.id};
                });
                self.filter('horario.comision.id', self.comisiones[0].value.id);
            });
        this.periodoService.getAll().subscribe(periodos => {
            self.periodos = periodos.map(periodo => {
                return {label: periodo.descripcion, value: periodo.id}
            });
            self.periodos.unshift({label: 'Todos', value: null});
            self.periodo = self.periodos[0].value;
            self.filterPeriodo(this.periodos[0].value);
        });
        this.periodoIdFilterSubject.subscribe(periodoId => {
            self.filter('horario.comision.periodo.id', periodoId);
        });
        this.tolerancia.subscribe(valor => {
            self.toleranciaActual = valor;
        });
        this.tolerancia.combineLatest(this.store.items,
            function (tolerancia: number, clases: Clase[]) {
                var cantidadATiempo = 0;
                var cantidadTarde = 0;
                var cantidadAusente = 0;
                for (let clase of clases) {
                    if (clase.hora_llegada == null)
                        cantidadAusente = cantidadAusente + 1;
                    else {
                        var min = Math.floor((clase.getHoraLlegada().getTime() - clase.getHoraInicioDate().getTime()) / 60000);
                        if (min <= tolerancia)
                            cantidadATiempo = cantidadATiempo + 1;
                        else
                            cantidadTarde = cantidadTarde + 1;
                    }
                }
                return {
                    cantidadATiempo: cantidadATiempo,
                    cantidadTarde: cantidadTarde,
                    cantidadAusente: cantidadAusente,
                    cantidadTotal: clases.length
                };
            }).subscribe(cant => {
            self.cantidadATiempo = cant.cantidadATiempo;
            self.cantidadTarde = cant.cantidadTarde;
            self.cantidadAusente = cant.cantidadAusente;
            self.cantidadTotal = cant.cantidadTotal;
            self.actualizar(self.chart);
        });
        this.data = {
            labels: ['A tiempo', 'Tarde', 'Ausente'],
            datasets: [
                {
                    data: [this.cantidadATiempo, this.cantidadTarde, this.cantidadAusente],
                    backgroundColor: [
                        "#73ce46",
                        "#ffc107",
                        "#e62a10"
                    ],
                    hoverBackgroundColor: [
                        "#73ce46",
                        "#ffc107",
                        "#e62a10"
                    ]
                }]
        };
    }

    protected getDefaultNewEntity(): Clase {
        return new Clase();
    }

    protected getEntityFromEvent(event: any): Clase {
        return new Clase(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'la clase del aula ' + entity.aula.nombre + ' con fecha ' + entity.getFechaString();
    }

    protected getSearchFields(): string[] {
        return ['aula.nombre', 'fecha', 'hora_inicio', 'hora_fin', 'comentario']
    }

    protected onOpenDialog(clase: Clase): void {
    }

    protected onSave(clase: Clase): Clase {
        return clase;
    }

    public filtrarComision(): void {
        this.filter('horario.comision.id', this.comision.id);
    }

    filterPeriodo(periodoId: number) {
        this.periodoIdFilterSubject.next(periodoId);
    }

    private actualizar(chart: UIChart) {
        this.data = {
            labels: ['A tiempo: ' + this.cantidadATiempo, 'Tarde: ' + this.cantidadTarde, 'Ausente: ' + this.cantidadAusente],
            datasets: [
                {
                    data: [this.cantidadATiempo, this.cantidadTarde, this.cantidadAusente],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
        };
        chart.refresh();
    }

    public updateTolerancia(toleranciaActual: number) {
        this.tolerancia.next(toleranciaActual);
    }


}
/**
 * Created by Federico on 17/11/2016.
 */
