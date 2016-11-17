import {Component} from '@angular/core';
import {QueryOptions} from "../../services/generic.service";
import {AulaService} from "../../services/aula.service";
import {Aula} from "../../entities/aula";



@Component({
    templateUrl: 'app/components/aula/aula.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'aula',
    providers: [AulaService]
})
export class AulaComponent {

    queryOptions: QueryOptions = new QueryOptions({includes : ['edificio']});

    displayDialog: boolean;

    aula: Aula = new Aula();

    selectedAula: Aula;

    newAula: boolean;

    aulas: Aula[];

    constructor(private aulaService: AulaService) {
    }

    ngOnInit() {
        this.aulaService.query(this.queryOptions).subscribe(aulas => this.aulas = aulas);
    }

    showDialogToAdd() {
        this.newAula = true;
        this.aula = new Aula();
        this.displayDialog = true;
    }

    add(aula: Aula): void {
        this.aulaService.create(aula).subscribe(aula => {
                this.aula = aula;
                this.aulas.push(aula);
                this.selectedAula= null;
            }
        );
    }

    save() {
        //insert
        if (this.newAula) {
            this.add(this.aula);
        }
        //update
        else {
            this.aulaService.update(this.aula).subscribe(aula => {
                this.aula[this.findSelectedAulaIndex()] = aula;
            });
        }
        this.aula = null;
        this.displayDialog = false;
    }


    delete() {
        this.aulaService.delete(this.aula);
        this.aulas.splice(this.findSelectedAulaIndex(), 1);
        this.aula = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newAula = false;
        this.aula = this.cloneAula(event.data);
        this.displayDialog = true;
    }

    cloneAula(a: Aula): Aula {
        let aula = new Aula();
        for (let prop in a) {
            aula[prop] = a[prop];
        }
        return aula;
    }

    findSelectedAulaIndex(): number {
        return this.aulas.indexOf(this.selectedAula);
    }

}	/**
 * Created by Federico on 17/11/2016.
 */
