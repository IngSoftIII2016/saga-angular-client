import {Component} from '@angular/core';
import {QueryOptions} from "../../services/generic.service";
import {ClaseService} from "../../services/clase.service";
import {Clase} from "../../entities/clase";


@Component({
    templateUrl: 'app/components/clase/clase.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'clase',
    providers:[ClaseService]
})
export class ClaseComponent {

    queryOptions : QueryOptions = new QueryOptions();

    displayDialog: boolean;

    clase: Clase= new Clase();

    fecha: Date = new Date();

    selectedClase: Clase;

    newClase: boolean;

    clases: Clase[];

    constructor(private claseService: ClaseService) { }

    ngOnInit() {
        this.claseService.query(this.queryOptions).subscribe(clases => this.clases = clases);
    }

    showDialogToAdd() {
        this.newClase = true;
        this.clase = new Clase();
        this.displayDialog = true;
    }

    add(clase: Clase): void {
        this.claseService.create(clase).subscribe(clase => {
                this.clase = clase;
                this.clases.push(clase);
                this.selectedClase= null;

            }
        );
    }

    save() {
        this.clase.setFecha(this.fecha);
        //insert
        if(this.newClase){
            this.add(this.clase);
        }
        //update
        else{
            this.claseService.update(this.clase).subscribe(periodo => {
                this.clases[this.findSelectedClaseIndex()] = periodo;
            });
        }
        this.clase = null;
        this.displayDialog = false;
    }


    delete() {
        this.claseService.delete(this.clase);

        this.clases.splice(this.findSelectedClaseIndex(), 1);
        this.clase = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newClase = false;
        this.clase = this.cloneClase(event.data);
        this.fecha = this.clase.getFecha();
        this.displayDialog = true;
    }

    cloneClase(c: Clase): Clase{
        let clase = new Clase();
        for(let prop in c) {
            clase[prop] = c[prop];
        }
        return clase;
    }

    findSelectedClaseIndex(): number {
        return this.clases.indexOf(this.selectedClase);
    }
}	/**
 * Created by Federico on 17/11/2016.
 */
