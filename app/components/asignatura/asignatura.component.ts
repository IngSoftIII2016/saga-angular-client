import {Component} from '@angular/core';
import {Asignatura} from "../../entities/asignatura";
import {AsignaturaService} from "../../services/asignatura.service";
import {QueryOptions} from "../../services/generic.service";



@Component({
    templateUrl: 'app/components/asignatura/asignatura.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'asignatura',
    providers: [AsignaturaService]
})
export class AsignaturaComponent {

    queryOptions: QueryOptions = new QueryOptions();

    displayDialog: boolean;

    asignatura: Asignatura = new Asignatura();

    selectedAsignatura: Asignatura;

    newAsignatura: boolean;

    asignaturas: Asignatura[];

    constructor(private asignaturaService: AsignaturaService) {
    }

    ngOnInit() {
        this.asignaturaService.query(this.queryOptions).subscribe(asignaturas => this.asignaturas = asignaturas);
    }

    showDialogToAdd() {
        this.newAsignatura = true;
        this.asignatura = new Asignatura();
        this.displayDialog = true;
    }

    add(asignatura: Asignatura): void {
        this.asignaturaService.create(asignatura).subscribe(asignatura => {
                this.asignatura = asignatura;
                this.asignaturas.push(asignatura);
                this.selectedAsignatura = null;
            }
        );
    }

    save() {
        //insert
        if (this.newAsignatura) {
            this.add(this.asignatura);
        }
        //update
        else {
            this.asignaturaService.update(this.asignatura).subscribe(asignatura => {
                this.asignaturas[this.findSelectedAsignaturaIndex()] = asignatura;
            });
        }
        this.asignaturas = null;
        this.displayDialog = false;
    }


    delete() {
        this.asignaturaService.delete(this.asignatura);
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
            asignatura[prop] = p[prop];
        }
        return asignatura;
    }

    findSelectedAsignaturaIndex(): number {
        return this.asignaturas.indexOf(this.selectedAsignatura);
    }

}	
