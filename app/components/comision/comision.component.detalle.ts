import {ComisionComponent} from "./comision.component";
import {Component, OnInit} from "@angular/core";
import {Comision} from "../../entities/comision";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ComisionStore} from "../../services/comision.store";
import {ComisionService} from "../../services/comision.service";
import {QueryOptions} from "../../commons/generic.service";
import {SelectItem, ConfirmationService} from "primeng/components/common/api";
import {Asignatura} from "../../entities/asignatura";
import {Periodo} from "../../entities/periodo";
import {Docente} from "../../entities/docente";
import {AsignaturaService} from "../../services/asignatura.service";
import {PeriodoService} from "../../services/periodo.service";
import {DocenteService} from "../../services/docente.service";
import {CRUD} from "../../commons/crud";

/**
 * Created by sandro on 30/1/2017.
 */
@Component({

    templateUrl: 'app/components/comision/comision.component.detalle.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'comision-detalle'
})

export class ComisionComponentDetalle implements OnInit {

    constructor(private comisionStore: ComisionStore,
                private comisionService : ComisionService,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService) {
    }

    comision : Comision;


    ngOnInit() {
        let self = this;
        //console.log("params: "+this.route.params['id']);
        this.route.params
        // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.comisionService.get(+params['id']))
            .subscribe((comision: Comision) => this.comision = comision);
    }


}