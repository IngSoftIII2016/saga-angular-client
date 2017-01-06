import {Component} from '@angular/core';
import {Docente} from '../../entities/docente';
import {DocenteStore} from "../../services/docente.sotre";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {CRUD} from "../../commons/crud";
import {DocenteService} from "../../services/docente.service";

/*class PrimeDocente implements Docente {
    constructor(public id?, public nombre?, public apellido?) {}
}
*/
@Component({
	templateUrl: '/docente.component.html',
    styleUrls: ['../../../resources/demo/css/dialog.css'],
	selector: 'docente',
	providers:[DocenteStore, ConfirmationService]
})
export class DocenteComponent  extends CRUD<Docente, DocenteService, DocenteStore>{

    constructor(private docenteStore: DocenteStore,  private confirmationService : ConfirmationService) {
        super(docenteStore,confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
    }


    protected getDefaultNewEntity(): Docente {
        return new Docente();
    }

    protected getEntityFromEvent(event: any): Docente {
        return new Docente(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'el docente ' + this.entity.nombre + ' ' + this.entity.apellido + ' ';
    }

    protected getSearchFields(): string[] {
        return ['nombre', 'apellido']
    }


}	
