import {Component, OnInit, Input} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs";
import {Params, ActivatedRoute} from "@angular/router";
import {Edificio} from "../../entities/edificio";
import {Aula} from "../../entities/aula";
import {Clase} from "../../entities/clase";
import {EdificioService} from "../../services/edificio.service";
import {AulaService} from "../../services/aula.service";
import {ClaseService} from "../../services/clase.service";
import {Evento} from "../../entities/evento";

declare var moment: any;

@Component({
    selector: 'grilla',
    templateUrl: 'app/components/grilla/grilla.component.html',
    providers: [EdificioService, AulaService, ClaseService]
})
export class GrillaComponent implements OnInit {

    edificio: Edificio;
    private fecha = new BehaviorSubject<Date>(new Date());
    private clases: Observable<Clase[]>;
    private eventos: Observable<Evento[]>;
    private aulas: Aula[];
    private events: any[];
    private resources: any[];
    private scheduleHeader: any;

    constructor(
        private route: ActivatedRoute,
        private edificioService: EdificioService,
        private aulaService: AulaService,
        private claseService: ClaseService
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.edificioService.get(id)
                .subscribe(edificio => {
                    this.edificio = edificio;
                    this.aulaService.queryByEdificio(edificio)
                        .subscribe(aulas => this.aulas = aulas);
                });
            });


        this.resources = [
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

        this.scheduleHeader = {
            left: 'prev,next today',
            center: 'title',
            right: ''
        };
    }

    getEvents(event) {
        /*this.claseService.getClases(event.day, this.edificio)
            .map(function (clase) {
                return {
                    'start': moment(clase)
                }
            })*/
    }

    nextDay(): void {
        let d = this.fecha.getValue();
        d.setDate(d.getDate() + 1);
        this.fecha.next(d);
    }

    prevDay(): void {
        let d = this.fecha.getValue();
        d.setDate(d.getDate() - 1);
        this.fecha.next(d);
    }

}