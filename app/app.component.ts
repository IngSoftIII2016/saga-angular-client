import {Component, OnInit} from "@angular/core";
import {Edificio} from "./entities/edificio";
import {EdificioService} from "./services/edificio.service";


@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
    providers: [EdificioService]
})
export class AppComponent implements OnInit {

    private edificios: Edificio[];
    private edificioSelected: Edificio;

    constructor(private edificioService: EdificioService) { }

    ngOnInit(): void {
        this.edificioService.getAll()
            .then(res => {
                this.edificios = res;
                this.edificioSelected = this.edificios[0];
            });
    }
    clicked(event) {
        alert(event.toString() + "Falta agregar una funcion que esconda el menu");

    }
}