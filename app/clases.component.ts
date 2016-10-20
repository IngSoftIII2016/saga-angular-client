import {Component, OnInit, Input} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs";
import {Params, ActivatedRoute} from "@angular/router";
import {Edificio} from "./entities/edificio";
import {Aula} from "./entities/aula";
import {Clase} from "./entities/clase";
import {EdificioService} from "./services/edificio.service";
import {AulaService} from "./services/aula.service";
import {ClaseService} from "./services/clase.service";

@Component({
    selector: 'clases',
    templateUrl: './app/clases.component.html',
    providers: [EdificioService, AulaService, ClaseService]
})
export class ClasesComponent implements OnInit {

    edificio: Edificio;
    private fecha = new BehaviorSubject<Date>(new Date());
    private clases: Observable<Clase[]>;
    private aulas: Aula[];
    private ratio: number;

    constructor(
        private route: ActivatedRoute,
        private edificioService: EdificioService,
        private aulaService: AulaService,
        private claseService: ClaseService
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.edificioService.getById(id)
                .then(edificio => {
                    this.edificio = edificio;
                    this.aulaService.getAulasByEdificio(edificio)
                        .then(aulas => this.aulas = aulas);
                    this.clases = this.fecha
                        .switchMap(date => this.claseService.getClases(date));
                });
            });
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