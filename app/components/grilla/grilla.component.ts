import {Component, OnInit, ViewChild} from "@angular/core";
import {Observable, BehaviorSubject, Subscription, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Edificio} from "../../entities/edificio";
import {Aula} from "../../entities/aula";
import {Clase} from "../../entities/clase";
import {EdificioService} from "../../services/edificio.service";
import {AulaService} from "../../services/aula.service";
import {Evento} from "../../entities/evento";
import {ClaseStore} from "../../services/clase.store";
import {EventoStore} from "../../services/evento.store";
import {toMySQLDate} from "../../commons/utils";

import {CALENDAR_LOCALE_ES} from '../../commons/calendar-locale-es';
import {Message, SelectItem} from "primeng/components/common/api";
import {TimelineDaySchedule} from "./timeline-day-schedule.component";

declare var moment: any;

@Component({
    selector: 'grilla',
    templateUrl: 'app/components/grilla/grilla.component.html',
    styleUrls: ['app/components/grilla/grilla.component.css', 'app/resources/demo/css/dialog.css'],
    providers: [EdificioService, AulaService, ClaseStore, EventoStore]
})
export class GrillaComponent implements OnInit {

    @ViewChild(TimelineDaySchedule)
    private schedule: TimelineDaySchedule;

    edificio: Subject<Edificio>;

    edificios: SelectItem[];

    edificioSelected: Edificio;

    searchTerms = new BehaviorSubject<string>('');

    aulas: Observable<Aula[]>;

    fecha = new Subject<Date>();

    clases: Observable<Clase[]>;

    obsResources: Observable<any[]>;

    resources: any[] = [];

    events: Observable<any[]>;

    defaultDate: Date;

    scrollTime: string;

    fechaCalendar: Date;

    //eventSelected: any = null;

    claseSelected: Clase;

    eventoSelected: Evento;

    aulasOptions: SelectItem[] = [];

    //displayDialog: boolean = false;

    displayAulaDialog: boolean = false;

    displayEventoDialog: boolean = false;

    es: any = CALENDAR_LOCALE_ES;

    scheduleHeader: any;

    msgs: Message[] = [];

    eventSubscription: Subscription = null;

    buttonText = {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Dia'
    };

    fechaSelected: Date;

    inicioSelected: Date;

    finSelected: Date;

    llegadaSelected: Date = null;

    esHoy: boolean;

    constructor(private route: ActivatedRoute,
                private edificioService: EdificioService,
                private aulaService: AulaService,
                private claseStore: ClaseStore,
                private eventoStore: EventoStore) {
    }

    ngOnInit(): void {

        var self = this;

        //this.scrollTime = new Date(Date.now()).toTimeString().split(' ')[0];
        this.defaultDate = moment({h: 0, m: 0, s: 0, ms: 0}).utc();

        this.scrollTime = moment().format('HH:mm:ss');

        this.edificio = new Subject<Edificio>();

        this.edificioService.getAll()
            .subscribe(edificios => {
                self.edificios = edificios.map(edificio => {
                    return {label: edificio.nombre, value: edificio}
                })
                if (localStorage.getItem('edificio'))
                    self.edificio.next(JSON.parse(localStorage.getItem('edificio')) as Edificio);
                else
                    self.edificio.next(edificios[0]);
            });

        this.aulas = this.edificio
            .flatMap(edificio => this.aulaService.queryByEdificio(edificio));

        this.obsResources = this.aulas
            .map(aulas => aulas.map(
                function (aula) {
                    return {id: aula.id, title: aula.nombre}
                }));

        this.fecha.distinctUntilChanged(null, x => Math.floor(x.getTime() / 86400000))
            .combineLatest(
                self.edificio.distinctUntilChanged(null, x => x.id),
                function (fecha, edificio) {
                    return {edificio: edificio, fecha: fecha}
                })
            .subscribe(function (fe) {
                let qo = {
                    filters: {
                        'aula.edificio.id': fe.edificio.id,
                        'fecha': toMySQLDate(fe.fecha)
                    },
                    page: -1
                };
                self.claseStore.mergeQueryOptions(qo);
                self.eventoStore.mergeQueryOptions(qo);
            });

        this.fecha.distinctUntilChanged(null, x => Math.floor(x.getTime() / 86400000))
            .do(fecha => {
                console.log('updateCalendar');
                console.log(fecha)
            })
            .subscribe(fecha => {
                this.fechaCalendar = fecha;
                this.esHoy = moment().isSame(this.fechaCalendar, 'day');
            });

        this.events = this.claseStore.items
            .map(function (clases: Clase[]) {
                return clases.map(GrillaComponent.claseToEvent)
            }).combineLatest(self.eventoStore.items
                    .map((eventos: Evento[]) => eventos.map(GrillaComponent.eventoToEvent)),
                function (clases, eventos) {
                    return clases.concat(eventos);
                }
            ).combineLatest(self.searchTerms,
                function (events, terms) {
                    return events.map(function (e) {
                        if (terms.length > 0 && e.title.search(terms) != -1)
                            e.color = '#7f0000';
                        return e;
                    });
                });


        this.scheduleHeader = {
            left: 'prev,next today',
            center: 'title',
            right: ''
        };

        this.buttonText = {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Dia'
        };


        this.aulaService.getAll()
            .subscribe(aulas => {
                self.aulasOptions = aulas
                    .map(aula => {
                        return {label: aula.nombre + ' - ' + aula.edificio.nombre, value: new Aula(aula)}
                    });
            })

        this.edificio.subscribe(edificio => self.edificioSelected = edificio);

    }

    onChangeEdificio(event): void {
        //console.log(event);
        let edificio: Edificio = event.value as Edificio;
        localStorage.setItem('edificio', JSON.stringify(edificio))
        this.edificio.next(edificio);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    saveClase() {
        this.claseSelected.setFechaDate(this.fechaSelected);
        this.claseSelected.setHoraInicioDate(this.inicioSelected);
        this.claseSelected.setHoraFinDate(this.finSelected);
        this.claseSelected.setHoraLlegada(this.llegadaSelected);
        this.claseStore.update(this.claseSelected).subscribe(editada => {
            this.schedule.refetchEvents();
            this.displayAulaDialog = false;
            this.msgs.push(
                {
                    severity: 'success',
                    summary: 'Modificida',
                    detail: 'Se ha modificado la clase de ' + this.claseSelected.horario.comision.asignatura.nombre + ' con exito!'
                })
        }, error => {
            this.msgs.push(
                {
                    severity: 'error',
                    summary: error.json().error.title,
                    detail: error.json().error.detail
                });
        });
    }

    saveEvento() {
        this.eventoSelected.setFechaDate(this.fechaSelected);
        this.eventoSelected.setHoraInicioDate(this.inicioSelected);
        this.eventoSelected.setHoraFinDate(this.finSelected);
        this.eventoStore.update(this.eventoSelected).subscribe(editada => {
            this.schedule.refetchEvents();
            this.displayEventoDialog = false;
            this.msgs.push(
                {
                    severity: 'success',
                    summary: 'Modificido',
                    detail: 'Se ha modificado el evento ' + this.eventoSelected.motivo + ' con exito!'
                })
        }, error => {
            this.msgs.push(
                {
                    severity: 'error',
                    summary: error.json().error.title,
                    detail: error.json().error.detail
                });
        });
    }


    cancel(): void {
        this.displayAulaDialog = false;
        this.displayEventoDialog = false;
        this.schedule.refetchEvents();
    }

    getEvents(event): void {
        if (this.eventSubscription != null)
            this.eventSubscription.unsubscribe();

        this.fecha.next(event.day);
        this.eventSubscription = this.events.debounceTime(250).subscribe(event.callback);
    }

    onEventClick(event): void {
        this.selectEvent(event.calEvent);
    }

    onEventMouseover(event): void {
    }

    onEventMouseout(event): void {
    }

    onEventDragStart(event): void {
    }

    onEventDragStop(event): void {
    }

    onEventDrop(event): void {
        this.selectEvent(event.event);
    }

    onEventResizeStart(event): void {
    }

    onEventResizeStop(event): void {
    }

    onEventResize(event): void {
        this.selectEvent(event.event);
    }

    selectEvent(event) {
        switch (event.type) {
            case 'Clase':
                this.claseSelected = this.eventToClase(event);
                this.fechaSelected = this.claseSelected.getFechaDate();
                this.inicioSelected = this.claseSelected.getHoraInicioDate();
                this.finSelected = this.claseSelected.getHoraFinDate();
                this.llegadaSelected = this.claseSelected.getHoraLlegada();
                this.displayAulaDialog = true;
                break;
            case 'Evento':
                this.eventoSelected = this.eventToEvento(event);
                this.fechaSelected = this.eventoSelected.getFechaDate();
                this.inicioSelected = this.eventoSelected.getHoraInicioDate();
                this.finSelected = this.eventoSelected.getHoraFinDate();
                this.displayEventoDialog = true;
                break;
        }
    }

    getAulaById(id: number): Aula {
        for (let i in this.aulasOptions)
            if (this.aulasOptions[i].value.id == id)
                return this.aulasOptions[i].value;
    }

    eventToClase(event: any): Clase {
        let clase: Clase = new Clase(event.model);
        clase.aula = this.getAulaById(event.resourceId);
        clase.setFechaDate(event.start.toDate());
        clase.setHoraInicioDate(event.start.toDate());
        clase.setHoraFinDate(event.end.toDate());
        return clase;
    }

    static claseToEvent(clase: Clase): any {
        return {
            id: 'c' + clase.id,
            type: 'Clase',
            model: clase as any,
            resourceId: clase.aula.id,
            start: moment(clase.fecha + ' ' + clase.hora_inicio),
            end: moment(clase.fecha + ' ' + clase.hora_fin),
            title: clase.horario.comision.asignatura.nombre + ' ' + clase.horario.comision.nombre ,
            color: '#60bd31'
        }
    }

    eventToEvento(event: any): Evento {
        console.log('eventToEvento');
        console.log(event);
        let evento: Evento = new Evento(event.model);
        evento.aula = this.getAulaById(event.resourceId);
        evento.setFechaDate(event.start.toDate());
        evento.setHoraInicioDate(event.start.toDate());
        evento.setHoraFinDate(event.end.toDate());
        return evento;
    }

    static eventoToEvent(evento: Evento): any {
        return {
            id: 'e' + evento.id,
            type: 'Evento',
            model: evento as any,
            resourceId: evento.aula.id,
            start: moment(evento.fecha + ' ' + evento.hora_inicio),
            end: moment(evento.fecha + ' ' + evento.hora_fin),
            title: evento.motivo,
            color: '#2b35a9'
        }
    }

    private createLlegada(): void {
        this.llegadaSelected = new Date();
    }

    private clearLlegada(): void {
        this.llegadaSelected = null;
    }


}