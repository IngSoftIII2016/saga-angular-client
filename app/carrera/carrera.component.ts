import {Component} from '@angular/core';
import {Carrera} from '../_entities/carrera';
import {CarreraService} from '../_services/carrera.service';

class PrimeCarrera implements Carrera {
    constructor(public id?, public nombre?) {}
}

@Component({
	templateUrl: './app/carrera/carrera.component.html',
	selector: 'carrera',
	providers:[CarreraService]
})
export class CarreraComponent {

	displayDialog: boolean;

    carrera: Carrera = new PrimeCarrera();

    selectedCarrera: Carrera;

    newCarrera: boolean;

    carreras: Carrera[];

    constructor(private carreraService: CarreraService) { }

    ngOnInit() {
        this.carreraService.getCarrerasMedium().then(carreras => this.carreras = carreras);
    }

    showDialogToAdd() {
        this.newCarrera = true;
        this.carrera = new PrimeCarrera();
        this.displayDialog = true;
    }

	add(nombre: string): void {
		nombre = nombre.trim();
		if (!nombre) { return; }
		this.carreraService.create(nombre).subscribe(carrera => {
                this.carrera = carrera;
				this.carreras.push(carrera);
				this.selectedCarrera = null;

            }
		 );
	}
	
    save() {
		//insert
        if(this.newCarrera){
			this.add(this.carrera.nombre);
		}
		//update
        else{
			this.carreraService.update(this.carrera).then(carrera => {
            this.carreras[this.findSelectedCarreraIndex()] = carrera;
		});
		}
        this.carrera = null;
        this.displayDialog = false;
    }
	
	
    delete() {
		this.carreraService.delete(this.carrera.id);
		
        this.carreras.splice(this.findSelectedCarreraIndex(), 1);
        this.carrera = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCarrera = false;
        this.carrera = this.cloneCarrera(event.data);
        this.displayDialog = true;
    }

    cloneCarrera(c: Carrera): Carrera {
        let carrera = new PrimeCarrera();
        for(let prop in c) {
            carrera[prop] = c[prop];
        }
        return carrera;
    }

    findSelectedCarreraIndex(): number {
        return this.carreras.indexOf(this.selectedCarrera);
    }
}	
