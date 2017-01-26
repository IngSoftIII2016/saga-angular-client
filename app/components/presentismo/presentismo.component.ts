import {Component} from '@angular/core';
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
import {setUpFormContainer} from "@angular/forms/src/directives/shared";
import {UIChart} from "primeng/components/chart/chart";


@Component({
    templateUrl: 'app/components/presentismo/presentismo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'presentismo',
    providers:[ClaseStore, ComisionService, PeriodoService]
})
export class PresentismoComponent  extends CRUD<Clase, ClaseService, ClaseStore>{

    periodos: SelectItem[] = [];

    periodo: Periodo;

    comisiones: SelectItem[] = [];

    comision: Comision;

    private tolerancia= new Subject<number>();

    toleranciaActual: number = 5;

    cantidadTotal : number;

    cantidadATiempo : number

    cantidadTarde : number;

    cantidadAusente : number;

    data: any;

    es: any = CALENDAR_LOCALE_ES;

    constructor(private claseStore: ClaseStore,
                private comisionService: ComisionService,
                private periodoService: PeriodoService) {
        super(claseStore);
    }

    ngOnInit() {
        let self = this;
        this.comisionService.getAll().subscribe(comisiones => {
            self.comisiones = comisiones.map(comision => {
                return {label: comision.asignatura.nombre, value: comision}
            })
            self.comision = comisiones[0];
            self.filtrarComision();
        });
        this.periodoService.getAll().subscribe(periodos => {
            self.periodos = periodos.map(periodo => {
                return {label: periodo.descripcion, value: periodo}
            })
            self.periodo = periodos[periodos.length - 1];
            self.filtrarPeriodo();
        });
        this.tolerancia.subscribe(valor => self.toleranciaActual = valor);
        this.tolerancia.combineLatest(this.store.items,
            function(tolerancia: number, clases : Clase[]) {
                var cantidadATiempo = 0;
                var cantidadTarde = 0;
                var cantidadAusente = 0;
                for (let clase of clases ){
                    if (clase.hora_llegada == null)
                     cantidadAusente = cantidadAusente + 1;
                     else {
                     var min= Math.floor((clase.getHoraLlegada().getTime() - clase.getHoraInicioDate().getTime()) / 60000);
                     if( min <= tolerancia)
                     cantidadATiempo = cantidadATiempo + 1 ;
                     else
                     cantidadTarde = cantidadTarde + 1;
                     }
                }
                return {cantidadATiempo : cantidadATiempo,
                    cantidadTarde: cantidadTarde,
                    cantidadAusente: cantidadAusente,
                    cantidadTotal: clases.length};
            }).subscribe(cant => {this.cantidadATiempo = cant.cantidadATiempo,
            this.cantidadTarde = cant.cantidadTarde,
            this.cantidadAusente = cant.cantidadAusente,
            this.cantidadTotal = cant.cantidadTotal});
        this.data = {
            labels: ['A tiempo','Tarde','Ausente'],
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
        return ['aula.nombre' , 'fecha', 'hora_inicio', 'hora_fin', 'comentario']
    }
    protected onOpenDialog(clase: Clase): void {
    }

    protected onSave(clase: Clase): Clase {
        return clase;
    }

    public filtrarComision() : void {
        this.filter('horario.comision.id', this.comision.id);
    }

    public filtrarPeriodo() : void {
        this.filter('horario.comision.periodo.id', this.periodo.id);
    }

    public filtrarComisionGrafico(chart : UIChart) : void {
        this.filter('horario.comision.id', this.comision.id);
        this.actualizar(chart);
    }

    public filtrarPeriodoGrafico(chart : UIChart) : void {
        this.filter('horario.comision.periodo.id', this.periodo.id);
        this.actualizar(chart);
    }


    private actualizar(chart : UIChart){
        this.data = {
            labels: ['A tiempo','Tarde','Ausente'],
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
        console.log('total ' +this.cantidadTotal);
        chart.refresh();
    }

    public updateTolerancia(toleranciaActual : number, chart :UIChart){
        console.log('Actual' + toleranciaActual);
        this.tolerancia.next(toleranciaActual);
        this.actualizar(chart);
    }


}
/**
 * Created by Federico on 17/11/2016.
 */
