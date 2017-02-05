import {Component} from '@angular/core';
import {Localidad} from "../../entities/localidad";
import {LocalidadService} from "../../services/localidad.service";
import {QueryOptions} from "../../commons/generic.service";
import {LocalidadStore} from "../../services/localidad.store";
import {SedeService} from "../../services/sede.service";
import {ConfirmationService, SelectItem} from "primeng/components/common/api";
import {Sede} from "../../entities/sede";
import {CRUD} from "../../commons/crud";
import {MessagesService} from "../../services/messages.service";


@Component({
    templateUrl: 'app/components/localidad/localidad.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'localidad',
    providers: [LocalidadStore, SedeService, ConfirmationService]
})

export class LocalidadComponent extends CRUD<Localidad, LocalidadService, LocalidadStore> {

    sedes: SelectItem[] = [];

    constructor(private localidadStore: LocalidadStore,
                private sedeService: SedeService,
                messagesService: MessagesService,
                private confirmationService: ConfirmationService) {
        super(localidadStore, messagesService, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        var sel = this;
        this.sedeService.getAll().subscribe(sedes => {
            sel.sedes = sedes.map(sede => {
                    return {label: sede.nombre, value: sede}
            }
        )
    });
    }

    protected getDefaultNewEntity(): Localidad {
        return new Localidad({
            sede: this.sedes[0].value as Sede
        });
    }

    protected getEntityFromEvent(event: any): Localidad {
        return new Localidad(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'la localidad ' + this.entity.nombre  ;
    }

    protected getSearchFields(): string[] {
        return ['nombre' , 'sede.nombre']
    }


}	
