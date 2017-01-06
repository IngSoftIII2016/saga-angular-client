import {Component} from '@angular/core';
import {Edificio} from '../../entities/edificio';
import {LocalidadService} from "../../services/localidad.service";
import {EdificioStore} from "../../services/edificio.store";
import {ConfirmationService, Message, SelectItem} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {Localidad} from "../../entities/localidad";
import {CRUD} from "../../commons/crud";
import {EdificioService} from "../../services/edificio.service";

@Component({
	templateUrl: '/edificio.component.html',
    styleUrls: ['../../../resources/demo/css/dialog.css'],
	selector: 'edificio',
	providers:[EdificioStore, LocalidadService, ConfirmationService]
})
export class EdificioComponent  extends CRUD<Edificio, EdificioService, EdificioStore>{

    localidades: SelectItem[] = [];

    constructor(private edificioStore: EdificioStore,
                private localidadService: LocalidadService,
                private confirmationService: ConfirmationService) {
        super(edificioStore,confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        var sel = this;
        this.localidadService.getAll().subscribe(localidades => {
            sel.localidades = localidades.map(localidad => {
                return { label: localidad.nombre + ' - ' + localidad.sede.nombre, value: localidad}
                }
            )
        });
    }

    protected getDefaultNewEntity(): Edificio {
        return new Edificio({
            localidad: this.localidades[0].value as Localidad}
        );
    }

    protected getEntityFromEvent(event: any): Edificio {
        return new Edificio(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'el edificio ' + this.entity.nombre + ' de la localidad de ' + this.entity.localidad.nombre + ' ';
    }

    protected getSearchFields(): string[] {
        return ['nombre', 'localidad.nombre', 'localidad.sede.nombre']
    }


}