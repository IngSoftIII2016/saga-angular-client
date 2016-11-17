import {Component, OnInit} from "@angular/core";
import {Edificio} from "../entities/edificio";
import {EdificioService} from "../services/edificio.service";


@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    styleUrls: ['app/components/app.component.css'],

    providers: [EdificioService]
})
export class AppComponent implements OnInit {

    private edificios: Edificio[];
    private edificioSelected: Edificio;
    private displayMenu: string;
    private displayButton: string;
    private visible: boolean;
    constructor(private edificioService: EdificioService) {
        this.displayMenu = 'layout-menu-static-inactive';
        this.displayButton = 'menu-button-rotate';
        this.visible = true;
    }


    ngOnInit(): void {
        this.edificioService.getAll()
            .then(res => {
                this.edificios = res;
                this.edificioSelected = this.edificios[0];
            });
    }

    toggle() {
        this.visible = !this.visible;
        this.displayMenu = this.visible ? 'layout-menu-static-inactive' : '';
        this.displayButton = this.visible ? 'menu-button-rotate' : '';
    }

}
