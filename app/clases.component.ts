import {Component, OnInit, Input} from "@angular/core";
import {Clase} from "./entities/clase";
import {ClaseService} from "./services/clase.service";
import {Observable, BehaviorSubject} from "rxjs";
import {Aula} from "./entities/aula";
import {AulaService} from "./services/aula.service";
import {Edificio} from "./entities/edificio";


@Component({
    selector: 'clases',
    templateUrl: './app/clases.component.html',
    providers: [ClaseService, AulaService]
})
export class ClasesComponent implements OnInit {

    @Input() edificio: Edificio;
    private fecha = new BehaviorSubject<Date>(new Date());
    private clases: Observable<Clase[]>;
    private aulas: Aula[];
    private ratio: number;

    constructor(
        private claseService: ClaseService,
        private aulaService: AulaService
    ) { }

    ngOnInit(): void {
        this.clases = this.fecha
            .switchMap(date => this.claseService.getClases(date));

        this.aulaService.getAulasByEdificio(this.edificio)
            .then(data => this.aulas = data);
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