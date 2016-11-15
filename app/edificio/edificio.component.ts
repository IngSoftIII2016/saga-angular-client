import {Component} from '@angular/core';
import {Localidad} from '../entities/localidad';
import {Edificio} from '../entities/edificio';
import {EdificioService} from '../services/edificio.service';

@Component({
	templateUrl: './app/edificio/edificio.component.html',
	selector: 'edificio',
	providers:[EdificioService]
})
export class EdificioComponent {

	displayDialog: boolean;

    edificio: Edificio = new Edificio();

    selectedEdificio: Edificio = null;

    newEdificio: boolean;

    edificios: Edificio[];

    constructor(private edificioService: EdificioService) { }

    ngOnInit() {
        this.edificioService.getEdificios().then(edificios => this.edificios = edificios);
    }

    load() {

    }

    showDialogToAdd() {
        this.newEdificio = true;
        this.edificio = new Edificio();
        this.displayDialog = true;
    }

	add(nombre: string, localidad: Localidad): void {
		nombre = nombre.trim();
		if (!nombre) { return; }
		this.edificioService.create(this.edificio).subscribe(edificio => {
                this.edificio = edificio;
				this.edificios.push(edificio);
				this.selectedEdificio = null;
            }
		 );
	}
	
    save() {
		//insert
        if(this.newEdificio){
            this.edificioService.create(this.edificio).subscribe(edificio => {
                    this.edificio = edificio;
                    this.edificios.push(edificio);
                    this.selectedEdificio = null;
                }
            );
		}
		//update
        else{
			this.edificioService.update(this.edificio).then(edificio => {
            this.edificios[this.findSelectedEdificioIndex()] = edificio;
		});
		}
        this.edificio = null;
        this.displayDialog = false;
    }
	
	
    delete() {
		this.edificioService.delete(this.edificio.id);
		
        this.edificios.splice(this.findSelectedEdificioIndex(), 1);
        this.edificio = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newEdificio = false;
        this.edificio = this.cloneEdificio(event.data);
        this.displayDialog = true;
    }

    cloneEdificio(e: Edificio): Edificio {
        let edificio = new Edificio();
        for(let prop in e) {
            edificio[prop] = e[prop];
        }
        return edificio;
    }

    findSelectedEdificioIndex(): number {
        return this.edificios.indexOf(this.selectedEdificio);
    }
}	
