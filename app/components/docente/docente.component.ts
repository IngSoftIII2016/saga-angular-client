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
	templateUrl: 'app/components/docente/docente.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'docente',
	providers:[DocenteStore, ConfirmationService]
})
export class DocenteComponent extends CRUD<Docente, DocenteService, DocenteStore>{

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

    protected getEntityReferencedLabel(entity): string {
        return 'el docente ' + entity.nombre + ' ' + entity.apellido + ' ';
    }

    protected getSearchFields(): string[] {
        return ['nombre', 'apellido']
    }


}	
