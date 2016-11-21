import {Component} from '@angular/core';
import {Localidad} from "../../entities/localidad";
import {LocalidadService} from "../../services/localidad.service";
import {QueryOptions} from "../../services/generic.service";

//class PrimeAsignatura implements Asignatura {
//    constructor(public id?, public nombre?, public carrera?) {}
//}

@Component({
    templateUrl: 'app/components/localidad/localidad.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'localidad',
    providers: [LocalidadService]
})

export class LocalidadComponent {

    queryOptions: QueryOptions = new QueryOptions({includes : ['sede']});

    displayDialog: boolean;

    localidad: Localidad = new Localidad();

    selectedLocalidad: Localidad;

    newLocalidad: boolean;

    localidades: Localidad[];

    constructor(private localidadService: LocalidadService) {
    }

    ngOnInit() {
        this.localidadService.query(this.queryOptions).subscribe(localidades => this.localidades = localidades);
    }

    showDialogToAdd() {
        this.newLocalidad = true;
        this.localidad = new Localidad();
        this.displayDialog = true;
    }

    add(localidad : Localidad): void {

        this.localidadService.create(localidad).subscribe(localidad => {
                this.localidad = localidad;
                this.localidades.push(localidad);
                this.selectedLocalidad = null;
            }
        );
    }

    save() {
        //insert
        if (this.newLocalidad) {
            this.add(this.localidad);
        }
        //update
        else {
            this.localidadService.update(this.localidad).subscribe(localidad => {
                this.localidades[this.findSelectedLocalidadIndex()] = localidad;
            });
        }
        this.localidad = null;
        this.displayDialog = false;
    }


    delete() {
        this.localidadService.delete(this.localidad);

        this.localidades.splice(this.findSelectedLocalidadIndex(), 1);
        this.localidad = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newLocalidad = false;
        this.localidad = this.cloneLocalidad(event.data);
        this.displayDialog = true;
    }

    cloneLocalidad(l: Localidad): Localidad {
        let localidad = new Localidad();
        for (let prop in l) {
            localidad[prop] = l[prop];
        }
        return localidad;
    }

    findSelectedLocalidadIndex(): number {
        return this.localidades.indexOf(this.selectedLocalidad);
    }

}	
