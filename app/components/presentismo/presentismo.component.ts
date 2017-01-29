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
import {QueryOptions} from "../../commons/generic.service";


@Component({
    templateUrl: 'app/components/presentismo/presentismo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'presentismo',
    providers: [ClaseStore]
})
export class PresentismoComponent {

    @ViewChild(UIChart)
    private grafico: UIChart;

    periodos: SelectItem[] = [];

    periodo: Periodo;

    comisiones: SelectItem[] = [];

    comision: Comision = null;

    clases: Subject<Clase[]> = new Subject<Clase[]>();

    private tolerancia = new Subject<number>();

    periodoIdFilterSubject = new Subject<number>();

    toleranciaActual: number = 5;

    cantidadTotal: number;

    cantidadATiempo: number;

    cantidadTarde: number;

    cantidadAusente: number;

    data: any;

    es: any = CALENDAR_LOCALE_ES;

    constructor(private claseService: ClaseService,
                private comisionService: ComisionService,
                private periodoService: PeriodoService) {
    }

    ngOnInit() {
        var self = this;

        this.periodoIdFilterSubject
            .switchMap(periodoId => {
                let qo = self.comisionService.getDefaultQueryOptions();
                qo.merge({filters: {'periodo.id': periodoId}, page: -1});
                return self.comisionService.query(qo);
            }).subscribe(comisiones => { //Actualizo las comisiones
            self.comisiones = comisiones.map(comision => {
                return {label: comision.etiqueta(), value: comision};
            });
            self.comision = self.comisiones[0].value;
            self.filtrarComision();
        });

        this.periodoService.getAll().subscribe(periodos => {
            self.periodos = periodos.map(periodo => {
                return {label: periodo.descripcion, value: periodo}
            });

            self.periodo = self.periodos[0].value;
            self.filterPeriodo();
        });

        this.tolerancia.combineLatest(this.clases,
            function (tolerancia: number, clases: Clase[]) {
                console.log(tolerancia);
                let cantidadATiempo = 0;
                let cantidadTarde = 0;
                let cantidadAusente = 0;
                for (let clase of clases) {
                    if (!clase.hora_llegada)
                        cantidadAusente++;
                    else {
                        let min = Math.floor((clase.getHoraLlegada().getTime() - clase.getHoraInicioDate().getTime()) / 60000);
                        if (min <= tolerancia)
                            cantidadATiempo++;
                        else
                            cantidadTarde++;
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
            self.actualizar(cant.cantidadATiempo, cant.cantidadTarde, cant.cantidadAusente);
        });

        this.actualizar(1, 0, 0)
        this.updateTolerancia();
    }

    filterPeriodo() {
        this.periodoIdFilterSubject.next(this.periodo.id);
    }

    public filtrarComision(): void {
        console.log('filtrarComision');
        this.claseService.query(
            this.claseService.getDefaultQueryOptions()
                .merge({filters: {'horario.comision.id': this.comision.id}, page: -1}))
            .subscribe(clases => this.clases.next(clases));
    }

    public updateTolerancia() {
        this.tolerancia.next(this.toleranciaActual);
    }

    private actualizar(aTiempo: number, tarde: number, ausente: number) {
        console.log('aTiempo:' + aTiempo);
        console.log('tarde:' + tarde);
        console.log('asuente:' + ausente);
        this.data = {
            labels: ['A tiempo: ' + aTiempo, 'Tarde: ' + tarde, 'Ausente: ' + ausente],
            datasets: [
                {
                    data: [aTiempo, tarde, ausente],
                    backgroundColor: [
                        "#00bf00",
                        "#ffd600",
                        "#ff4040"
                    ],
                    hoverBackgroundColor: [
                        "#00bf00",
                        "#ffd600",
                        "#ff4040"
                    ]
                }]
        };
        this.grafico.data = this.data;
        this.grafico.refresh();
    }


}
/**
 * Created by Federico on 17/11/2016.
 */
