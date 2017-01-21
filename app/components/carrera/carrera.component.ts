import {Component} from '@angular/core';
import {Carrera} from '../../entities/carrera';
import {CarreraStore} from "../../services/carrera.store";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {AsignaturaStore} from "../../services/asignatura.store";
import {AsignaturaService} from "../../services/asignatura.service";
import {Asignatura} from "../../entities/asignatura";
import {AsignaturaCarreraService} from "../../services/asignatura-carrera.service";
import {AsignaturaCarrera} from "../../entities/asignatura-carrera";
import {AsignaturaCarreraStore} from "../../services/asignatura-carrera.store";
import {CRUD} from "../../commons/crud";
import {CarreraService} from "../../services/carrera.service";


@Component({
	templateUrl: 'app/components/carrera/carrera.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'carrera',
	providers:[CarreraStore,ConfirmationService, AsignaturaCarreraStore]
})
export class CarreraComponent extends CRUD<Carrera, CarreraService, CarreraStore>{



    asignaturas: AsignaturaCarrera[] = [];

    regimenesTabla = new Array();


    constructor(private carreraStore: CarreraStore,  private confirmationService : ConfirmationService,
                private asignaturaCarreraStore: AsignaturaCarreraStore) {
        super(carreraStore,confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.regimenesTabla['1C'] = 'Primer Cuatrimestre';
        this.regimenesTabla['2C'] = 'Segundo Cuatrimestre';
        this.regimenesTabla['C'] = 'Cuatrimestral';
        this.regimenesTabla['Anual'] = 'Anual';
    }

    protected getDefaultNewEntity(): Carrera {
        return new Carrera();
    }

    protected getEntityFromEvent(event: any): Carrera {
        return new Carrera(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'la carrera ' + entity.nombre ;
    }

    protected getSearchFields(): string[] {
        return ['nombre']
    }


}	
