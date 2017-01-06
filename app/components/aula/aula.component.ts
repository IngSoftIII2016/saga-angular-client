import {Component} from '@angular/core';
import {Aula} from "../../entities/aula";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {AulaStore} from "../../services/aula.store";
import {EdificioService} from "../../services/edificio.service";
import {Edificio} from "../../entities/edificio";
import {Observable, Subject} from "rxjs";
import {forEach} from "@angular/router/src/utils/collection";
import {QueryOptions} from "../../commons/generic.service";
import {CRUD} from "../../commons/crud";
import {AulaService} from "../../services/aula.service";

@Component({
    templateUrl: 'app/components/aula/aula.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'aula',
    providers: [AulaStore, EdificioService, ConfirmationService]
})
export class AulaComponent extends CRUD<Aula, AulaService, AulaStore> {


    edificios: SelectItem[] = [];



    constructor(private aulaStore: AulaStore,
                private edificioService: EdificioService,
                private confirmationService: ConfirmationService) {
        super(aulaStore,confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        var sel = this;
            this.edificioService.getAll().subscribe(edificios => {
                sel.edificios= edificios.map(edificio => {
                        return { label: edificio.nombre + ', ' + edificio.localidad.nombre, value: edificio}
                    }
                )
            });
    }

    protected getDefaultNewEntity(): Aula {
        return new Aula({
            edificio: this.edificios[0].value as Edificio
        });
    }

    protected getEntityFromEvent(event: any): Aula {
        return new Aula(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'el aula ' + this.entity.nombre ;
    }

    protected getSearchFields(): string[] {
        return ['nombre' , 'capacidad', 'edificio.nombre', 'edificio.localidad.nombre']
    }


}
/**
 * Created by Federico on 17/11/2016.
 */
