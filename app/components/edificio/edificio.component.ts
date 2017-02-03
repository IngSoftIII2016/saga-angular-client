import {Component} from '@angular/core';
import {Edificio} from '../../entities/edificio';
import {LocalidadService} from "../../services/localidad.service";
import {EdificioStore} from "../../services/edificio.store";
import {ConfirmationService, Message, SelectItem} from "primeng/components/common/api";
import {Subject} from "rxjs";
import {Localidad} from "../../entities/localidad";
import {CRUD} from "../../commons/crud";
import {EdificioService} from "../../services/edificio.service";
import {MessagesService} from "../../services/messages.service";

@Component({
	templateUrl: 'app/components/edificio/edificio.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'edificio',
	providers:[EdificioStore, LocalidadService, ConfirmationService]
})
export class EdificioComponent extends CRUD<Edificio, EdificioService, EdificioStore>{

    localidades: SelectItem[] = [];

    constructor(private edificioStore: EdificioStore,
                private localidadService: LocalidadService,
                messagesService: MessagesService,
                private confirmationService: ConfirmationService) {
        super(edificioStore, messagesService, confirmationService);
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

    protected getEntityReferencedLabel(entity): string {
        return 'el edificio ' + entity.nombre + ' de la localidad de ' + entity.localidad.nombre + ' ';
    }

    protected getSearchFields(): string[] {
        return ['nombre', 'localidad.nombre', 'localidad.sede.nombre']
    }


}