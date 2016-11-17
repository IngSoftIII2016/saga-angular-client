import {Component} from '@angular/core';
import {Sede} from '../../entities/sede';
import {SedeService} from '../../services/sede.service';
import {QueryOptions} from "../../services/generic.service";


@Component({
	templateUrl: 'app/components/sede/sede.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'sede',
	providers:[SedeService]
})
export class SedeComponent {

    queryOptions : QueryOptions = new QueryOptions();

	displayDialog: boolean;

    sede: Sede = new Sede();

    selectedSede: Sede;

    newSede: boolean;

    sedes: Sede[];

    constructor(private sedeService: SedeService) { }

    ngOnInit() {
        this.sedeService.query(this.queryOptions).subscribe(sedes => this.sedes = sedes);
    }

    showDialogToAdd() {
        this.newSede = true;
        this.sede = new Sede();
        this.displayDialog = true;
    }

	add(sede: Sede): void {


		this.sedeService.create(sede).subscribe(sede => {
                this.sede = sede;
				this.sedes.push(sede);
				this.selectedSede = null;

            }
		 );
	}
	
    save() {
		//insert
        if(this.newSede){
			this.add(this.sede);
		}
		//update
        else{
			this.sedeService.update(this.sede).subscribe(sede => {
            this.sedes[this.findSelectedSedeIndex()] = sede;
		});
		}
        this.sede = null;
        this.displayDialog = false;
    }

	
    delete() {
		this.sedeService.delete(this.sede).subscribe(sede => console.log(sede));

        this.sedes.splice(this.findSelectedSedeIndex(), 1);
        this.sede = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newSede = false;
        this.sede = this.cloneSede(event.data);
        this.displayDialog = true;
    }

    cloneSede(s: Sede): Sede {
        let sede = new Sede();
        for(let prop in s) {
            sede[prop] = s[prop];
        }
        return sede;
    }

    findSelectedSedeIndex(): number {
        return this.sedes.indexOf(this.selectedSede);
    }
}	
