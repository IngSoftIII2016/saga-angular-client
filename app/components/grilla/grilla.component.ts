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
import {ConfirmationService, Message} from "primeng/components/common/api";

declare var moment: any;

@Component({
    selector: 'grilla',
    templateUrl: 'app/components/grilla/grilla.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    providers: [EdificioService, AulaService, ClaseStore, EventoStore]
})
export class GrillaComponent implements OnInit {
    msgs: Message[] = [];
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

    eventSelected: any = null;

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
                return clases.map(GrillaComponent.claseToEvent)
            }).combineLatest(this.eventoStore.items
                    .map( (eventos: Evento[]) => eventos.map(GrillaComponent.eventoToEvent)),
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

        if (this.eventSelected.type == 'Clase') {
            let clase = GrillaComponent.eventToClase(this.eventSelected);
            this.claseStore.update(clase).subscribe(editada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity: 'success',
                        summary: 'Modificida',
                        detail: 'Se ha modificado la clase ' + clase.horario.comision.asignatura + ' con exito!'
                    })
            }, error => {
                this.msgs.push(
                    {
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se ha podido modificar la clase:\n' + error
                    });
            });
        } else if (this.eventSelected.type == 'Evento') {
            let evento = GrillaComponent.eventToEvento(this.eventSelected);
            this.eventoStore.update(evento).subscribe(editada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity: 'success',
                        summary: 'Modificido',
                        detail: 'Se ha modificado el evento con exito!'
                    })
            }, error => {
                this.msgs.push(
                    {
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se ha podido modificar el evento:\n' + error
                    });
            });
        }
    }

    cancel(): void {
        if (this.eventSelected.type == 'Clase') {
            this.claseStore.mergeQueryOptions();
            /*
            let clase: Clase = this.eventSelected.model as Clase;
            let event = GrillaComponent.claseToEvent(clase);
            Object.assign(this.eventSelected, event);
            */
        }
        this.displayDialog = false;
    }


    getEvents(event): void {
        this.fecha.next(event.day);
        this.events.subscribe(event.callback)
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
        //console.log(event);
    }

    onEventDragStop(event): void {
        //console.log(event);
        this.eventSelected = event.event;
        this.displayDialog = true;
    }

    onEventDrop(event): void {
        //console.log(event);
        this.eventSelected = event.event;
        this.displayDialog = true;
    }

    onEventResizeStart(event): void {
        //console.log(event);
        //console.log("onEventResizeStart");
    }

    onEventResizeStop(event): void {
        //console.log(event);
        //console.log("onEventResizeStop");
        this.eventSelected = event.event;
        this.displayDialog = true;
    }

    onEventResize(event): void {
        //console.log(event);
        //console.log("onEventResize");
    }


    static eventToClase(event: any): Clase {
        let clase: Clase = event.model as Clase;
        clase.aula = event.aula;
        clase.hora_inicio = event.start._d.toTimeString().split(' ')[0];
        clase.hora_fin = event.end._d.toTimeString().split(' ')[0];
        return clase;
    }

    static claseToEvent(clase: Clase): any {
        return {
            id: clase.id,
            type: 'Clase',
            model: clase as any,
            resourceId: clase.aula.id,
            aula: clase.aula,
            start: moment(clase.fecha + ' ' + clase.hora_inicio),
            end: moment(clase.fecha + ' ' + clase.hora_fin),
            title: clase.horario.comision.asignatura.nombre + ' ' + clase.horario.comision.nombre
        }
    }

    static eventToEvento(event: any): Evento {
        let evento: Evento = event.model as Evento;
        evento.aula = event.aula;
        evento.hora_inicio = event.start._d.toTimeString().split(' ')[0];
        evento.hora_fin = event.end._d.toTimeString().split(' ')[0];
        return event;
    }

    static eventoToEvent(evento: Evento): any {
        return {
            id: evento.id,
            type: 'Evento',
            model: evento as any,
            resourceId: evento.aula.id,
            aula: evento.aula,
            start: evento.hora_inicio,
            end: evento.hora_fin,
            title: evento.motivo
        }
    }

    static parseDate(fecha: string, hora: string): Date {
        let d = new Date(fecha);
        let h = hora.split(':');
        return new Date(d.getFullYear(), d.getMonth(), d.getDay(), parseInt(h[0]), parseInt(h[1]), parseInt(h[2]));
    }

}