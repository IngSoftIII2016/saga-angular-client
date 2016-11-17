import {Component} from '@angular/core';
import {Localidad} from "../../entities/localidad";
import {LocalidadService} from "../../services/localidad.service";

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

    displayDialog: boolean;

    localidad: Localidad = new Localidad();

    selectedLocalidad: Localidad;

    newLocalidad: boolean;

    localidades: Localidad[];

    constructor(private localidadService: LocalidadService) {
    }

    ngOnInit() {
        this.localidadService.getLocalidadMedium().then(localidades => this.localidades = localidades);
    }

    showDialogToAdd() {
        this.newLocalidad = true;
        this.localidad = new Localidad();
        this.displayDialog = true;
    }

    add(nombre: string): void {
        nombre = nombre.trim();
        if (!nombre) {
            return;
        }
        this.localidadService.create(nombre).subscribe(asignatura => {
                this.localidad.nombre = nombre;
                this.localidades.push(asignatura);
                this.selectedLocalidad = null;
            }
        );
    }

    save() {
        //insert
        if (this.newLocalidad) {
            this.add(this.localidad.nombre);
        }
        //update
        else {
            this.localidadService.update(this.localidad).then(localidad => {
                this.localidades[this.findSelectedAsignaturaIndex()] = localidad;
            });
        }
        this.localidades = null;
        this.displayDialog = false;
    }


    delete() {
        this.localidadService.delete(this.localidad.id);

        this.localidades.splice(this.findSelectedAsignaturaIndex(), 1);
        this.localidad = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newLocalidad = false;
        this.localidad = this.cloneLocalidad(event.data);
        this.displayDialog = true;
    }

    cloneLocalidad(p: Localidad): Localidad {
        let localidad = new Localidad();
        for (let prop in p) {
            Localidad[prop] = p[prop];
        }
        return localidad;
    }

    findSelectedAsignaturaIndex(): number {
        return this.localidades.indexOf(this.selectedLocalidad);
    }

}	
