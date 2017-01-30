import {ComisionComponent} from "./comision.component";
import {Component} from "@angular/core";
import {Router} from "@angular/router";

/**
 * Created by sandro on 30/1/2017.
 */
@Component({

    templateUrl: 'app/components/comision/comision.component.detalle.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'comision-detalle'
})

export class ComisionComponentDetalle  {
    constructor(private _router: Router) { }

}