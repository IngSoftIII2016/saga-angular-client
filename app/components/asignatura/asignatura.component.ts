import {Component} from '@angular/core';
import {Asignatura} from "../../entities/asignatura";
import {AsignaturaService} from "../../services/asignatura.service";

//class PrimeAsignatura implements Asignatura {
//    constructor(public id?, public nombre?, public carrera?) {}
//}

@Component({
    templateUrl: 'app/components/asignatura/asignatura.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'asignatura',
    providers: [AsignaturaService]
})
export class AsignaturaComponent {

    displayDialog: boolean;

    asignatura: Asignatura = new Asignatura();

    selectedAsignatura: Asignatura;

    newAsignatura: boolean;

    asignaturas: Asignatura[];

    constructor(private asignaturaService: AsignaturaService) {
    }

    ngOnInit() {
        this.asignaturaService.getAsignaturaMedium().then(asignaturas => this.asignaturas = asignaturas);
    }

    showDialogToAdd() {
        this.newAsignatura = true;
        this.asignatura = new Asignatura();
        this.displayDialog = true;
    }

    add(nombre: string): void {
        nombre = nombre.trim();
        if (!nombre) {
            return;
        }
        this.asignaturaService.create(nombre).subscribe(asignatura => {
                this.asignatura.nombre = nombre;
                this.asignaturas.push(asignatura);
                this.selectedAsignatura = null;
            }
        );
    }

    save() {
        //insert
        if (this.newAsignatura) {
            this.add(this.asignatura.nombre);
        }
        //update
        else {
            this.asignaturaService.update(this.asignatura).then(asignatura => {
                this.asignaturas[this.findSelectedAsignaturaIndex()] = asignatura;
            });
        }
        this.asignaturas = null;
        this.displayDialog = false;
    }


    delete() {
        this.asignaturaService.delete(this.asignatura.id);

        this.asignaturas.splice(this.findSelectedAsignaturaIndex(), 1);
        this.asignatura = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newAsignatura = false;
        this.asignatura = this.cloneAsignatura(event.data);
        this.displayDialog = true;
    }

    cloneAsignatura(p: Asignatura): Asignatura {
        let asignatura = new Asignatura();
        for (let prop in p) {
            Asignatura[prop] = p[prop];
        }
        return asignatura;
    }

    findSelectedAsignaturaIndex(): number {
        return this.asignaturas.indexOf(this.selectedAsignatura);
    }

}	
