import {Component} from '@angular/core';
import {Sede} from '../_entities/sede';
import {SedeService} from '../_services/sede.service';

class PrimeSede implements Sede {
    constructor(public id?, public nombre?) {}
}

@Component({
	templateUrl: './app/sede/sede.component.html',
	selector: 'sede',
	providers:[SedeService]
})
export class SedeComponent {

	displayDialog: boolean;

    sede: Sede = new PrimeSede();

    selectedSede: Sede;

    newSede: boolean;

    sedes: Sede[];

    constructor(private sedeService: SedeService) { }

    ngOnInit() {
        this.sedeService.getSedesMedium().then(sedes => this.sedes = sedes);
    }

    showDialogToAdd() {
        this.newSede = true;
        this.sede = new PrimeSede();
        this.displayDialog = true;
    }

	add(nombre: string): void {
		nombre = nombre.trim();
		if (!nombre) { return; }
		this.sedeService.create(nombre).subscribe(sede => {
                this.sede = sede;
				this.sedes.push(sede);
				this.selectedSede = null;

            }
		 );
	}
	
    save() {
		//insert
        if(this.newSede){
			this.add(this.sede.nombre);
		}
		//update
        else{
			this.sedeService.update(this.sede).then(sede => {
            this.sedes[this.findSelectedSedeIndex()] = sede;
		});
		}
        this.sede = null;
        this.displayDialog = false;
    }
	
	
    delete() {
		this.sedeService.delete(this.sede.id);
		
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
        let sede = new PrimeSede();
        for(let prop in s) {
            sede[prop] = s[prop];
        }
        return sede;
    }

    findSelectedSedeIndex(): number {
        return this.sedes.indexOf(this.selectedSede);
    }
}	
