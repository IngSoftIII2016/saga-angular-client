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

declare var moment: any;

@Component({
    selector: 'grilla',
    templateUrl: 'app/components/grilla/grilla.component.html',
    providers: [EdificioService, AulaService, ClaseStore, EventoStore]
})
export class GrillaComponent implements OnInit {

    edificio: Observable<Edificio>;
    aulas: Observable<Aula[]>;
    fecha = new BehaviorSubject<Date>(new Date());
    clases: Observable<Clase[]>;
    private eventos: Observable<Evento[]>;
    private events: Observable<Object[]>;
    obsResources: Observable<any[]>;
    resources: any[] = [];
    scrollTime: string;
    private scheduleHeader: any;

    constructor(private route: ActivatedRoute,
                private edificioService: EdificioService,
                private aulaService: AulaService,
                private claseStore: ClaseStore,
                private eventoStore: EventoStore) {
    }

    ngOnInit(): void {

        this.scrollTime = new Date(Date.now()).toTimeString().split(' ')[0];

        console.log(this.scrollTime);

        this.edificio = this.route.params
            .flatMap(params => this.edificioService.get(params['id']))


        this.aulas = this.edificio
            .flatMap(edificio => this.aulaService.queryByEdificio(edificio))

        this.obsResources = this.aulas
            .map(aulas => aulas.map(
                function (aula) {
                    return {id: aula.id, title: aula.nombre}
                }))

/*
        this.edificio.combineLatest(
            this.fecha,
            function (edificio, fecha) {
                let qo = {
                    filters: {
                        'aula.edificio.id': edificio.id,
                        'fecha': fecha.format('yyyy-MM-dd')
                    }
                }
                this.claseStore.mergeQueryOptions(qo);
                this.eventoStore.mergeQueryOptions(qo);
            }
        );
*/
        /*
         [
         { id: '1', title: 'Aula 1' },
         { id: '2', title: 'Aula 2' },
         { id: '3', title: 'Aula 3' },
         { id: '4', title: 'Aula 4' }
         ];

         let TODAY = new Date().toISOString().substr(10);

         this.events = [
         { id: '1', resourceId: '1', start: TODAY + 'T02:00:00', end: TODAY + 'T07:00:00', title: 'event 1' },
         { id: '2', resourceId: '2', start: TODAY + 'T05:00:00', end: TODAY + 'T22:00:00', title: 'event 2' }
         ];
         */
        this.scheduleHeader = {
            left: 'prev,next today',
            center: 'title',
            right: ''
        };
    }

    getEvents(event) {
        var self = this;
        this.edificio
            .subscribe(function (edificio) {
                let qo = {
                    filters: {
                        'aula.edificio.id': edificio.id,
                        'fecha': event.day.format('YYYY-MM-DD')
                    },
                    page: -1
                }
                self.claseStore.items
                    .map(function (clases: Clase[]) {
                        return clases.map(function (clase: Clase) {
                            return {
                                id: clase.id,
                                type: 'Clase',
                                resourceId: clase.aula.id,
                                start: clase.hora_inicio,
                                end: clase.hora_fin,
                                title: clase.horario.comision.asignatura.nombre + ' ' + clase.horario.comision.nombre
                            }
                        })
                    })
                    .combineLatest(self.eventoStore.items
                            .map(function (eventos: Evento[]) {
                                    return eventos.map(function (evento: Evento) {
                                        return {
                                            id: evento.id,
                                            type: 'Evento',
                                            resourceId: evento.aula.id,
                                            start: self.parseDate(evento.fecha, evento.hora_inicio).toISOString(),
                                            end: self.parseDate(evento.fecha, evento.hora_fin).toISOString(),
                                            title: evento.motivo
                                        }
                                    })
                                }
                            ),
                        function (clases, eventos) {
                            return clases.concat(eventos);
                        }
                    ).do(events => console.log(events))
                    .subscribe(events => event.callback(events));

                self.claseStore.mergeQueryOptions(qo);
                self.eventoStore.mergeQueryOptions(qo);
            })

    }

    parseDate(fecha: string, hora: string): Date {
        let d = new Date(fecha);
        let h = hora.split(':');
        return new Date(d.getFullYear(), d.getMonth(), d.getDay(), parseInt(h[0]), parseInt(h[1]), parseInt(h[2]));
    }

}