import {Component, OnInit} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Edificio} from "../../entities/edificio";
import {Aula} from "../../entities/aula";
import {Clase} from "../../entities/clase";
import {EdificioService} from "../../services/edificio.service";
import {AulaService} from "../../services/aula.service";
import {Evento} from "../../entities/evento";
import {ClaseStore} from "../../services/clase.store";
import {EventoStore} from "../../services/evento.store";

import {CALENDAR_LOCALE_ES} from '../commons/calendar-locale-es';

declare var moment: any;

@Component({
    selector: 'grilla',
    templateUrl: 'app/components/grilla/grilla.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    providers: [EdificioService, AulaService, ClaseStore, EventoStore]
})
export class GrillaComponent implements OnInit {

    edificio: Observable<Edificio>;
    aulas: Observable<Aula[]>;
    fecha = new BehaviorSubject<Date>(new Date());
    clases: Observable<Clase[]>;
    private eventos: Observable<Evento[]>;
    obsResources: Observable<any[]>;
    resources: any[] = [];
    events: Observable<any[]>;
    scrollTime: string;
    fechaCalendar: Date = new Date();
    private scheduleHeader: any;

    eventSelected : any = null;

    displayDialog: boolean = false;

    es: any = CALENDAR_LOCALE_ES;

    constructor(private route: ActivatedRoute,
                private edificioService: EdificioService,
                private aulaService: AulaService,
                private claseStore: ClaseStore,
                private eventoStore: EventoStore) {
    }

    ngOnInit(): void {

        var self = this;

        this.scrollTime = new Date(Date.now()).toTimeString().split(' ')[0];

        this.edificio = this.route.params
            .flatMap(params => this.edificioService.get(params['id']))

        this.aulas = this.edificio
            .flatMap(edificio => this.aulaService.queryByEdificio(edificio))

        this.obsResources = this.aulas
            .map(aulas => aulas.map(
                function (aula) {
                    return {id: aula.id, title: aula.nombre}
                }))

        this.fecha
            .combineLatest(
                this.edificio,
                function (fecha, edificio) {
                    return {edificio: edificio, fecha: fecha}
                })
            .do(ef => console.log(ef))
            .subscribe(function (ef) {
                let qo = {
                    filters: {
                        'aula.edificio.id': ef.edificio.id,
                        'fecha': ef.fecha.toISOString().split('T')[0]
                    },
                    page: -1
                }
                self.claseStore.mergeQueryOptions(qo);
                self.eventoStore.mergeQueryOptions(qo);
            })

        this.events = this.claseStore.items
            .map(function (clases: Clase[]) {
                return clases.map(function (clase: Clase) {
                    return {
                        id: clase.id,
                        type: 'Clase',
                        resourceId: clase.aula.id,
                        aula: clase.aula,
                        start: clase.hora_inicio,
                        end: clase.hora_fin,
                        title: clase.horario.comision.asignatura.nombre + ' ' + clase.horario.comision.nombre
                    }
                })
            }).combineLatest(this.eventoStore.items
                .map(function (eventos: Evento[]) {
                        return eventos.map(function (evento: Evento) {
                            return {
                                id: evento.id,
                                type: 'Evento',
                                resourceId: evento.aula.id,
                                aula: evento.aula,
                                start: this.hora_inicio,
                                end: this.hora_fin,
                                title: evento.motivo
                            }
                        })
                    }
                ),
            function (clases, eventos) {
                return clases.concat(eventos);
            }
        );

        this.scheduleHeader = {
            left: 'prev,next today',
            center: 'title',
            right: ''
        };
    }

    save() {
        if(this.eventSelected.calEvent.type == 'Clase'){
            this.claseStore.service.get(this.eventSelected.calEvent.id)
                .subscribe(clase => {
                    clase.aula = this.eventSelected.calEvent.aula;
                    clase.hora_inicio = this.eventSelected.calEvent.start._d.toTimeString().split(' ')[0];
                    clase.hora_fin = this.eventSelected.calEvent.end._d.toTimeString().split(' ')[0];
                    console.log(clase);
                });
        }
    }

    getEvents(event): void {
        this.fecha.next(event.day);
        this.events.subscribe(events => event.callback(events))
    }

    onEventClick(event): void {
        console.log(event);
        this.eventSelected = event.calEvent;
        this.displayDialog = true;

    }

    onEventMouseover(event): void {
        //console.log(event);
    }

    onEventMouseout(event): void {
        //console.log(event);
    }

    onEventDragStart(event): void {
        console.log(event);
    }

    onEventDragStop(event): void {
        console.log(event);
    }

    onEventDrop(event): void {
        console.log(event);
    }

    onEventResizeStart(event): void {
        console.log(event);
    }

    onEventResizeStop(event): void {
        console.log(event);
    }

    onEventResize(event): void {
        console.log(event);
    }

    parseDate(fecha: string, hora: string): Date {
        let d = new Date(fecha);
        let h = hora.split(':');
        return new Date(d.getFullYear(), d.getMonth(), d.getDay(), parseInt(h[0]), parseInt(h[1]), parseInt(h[2]));
    }

}