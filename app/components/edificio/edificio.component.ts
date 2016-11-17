import {Component} from '@angular/core';
import {Localidad} from '../../entities/localidad';
import {Edificio} from '../../entities/edificio';
import {EdificioService} from "../../services/edificio.service";
import {QueryOptions} from "../../services/generic.service";

@Component({
	templateUrl: 'app/components/edificio/edificio.component.html',
	selector: 'edificio',
	providers:[EdificioService]
})
export class EdificioComponent {

    queryOptions: QueryOptions = new QueryOptions();

	displayDialog: boolean;

    edificio: Edificio = new Edificio();

    selectedEdificio: Edificio = null;

    newEdificio: boolean;

    edificios: Edificio[];

    constructor(private edificioService: EdificioService) { }

    ngOnInit() {
        this.edificioService.query(this.queryOptions).subscribe(edificios => this.edificios = edificios);
    }

    load() {

    }

    showDialogToAdd() {
        this.newEdificio = true;
        this.edificio = new Edificio();
        this.displayDialog = true;
    }

	add(edificio: Edificio): void {
		this.edificioService.create(edificio).subscribe(edificio => {
                this.edificio = edificio;
				this.edificios.push(edificio);
				this.selectedEdificio = null;
            }
		 );
	}
	
    save() {
		//insert
        if(this.newEdificio){
            this.add(this.edificio);

		}
		//update
        else{
			this.edificioService.update(this.edificio).subscribe(edificio => {
            this.edificios[this.findSelectedEdificioIndex()] = edificio;
		});
		}
        this.edificio = null;
        this.displayDialog = false;
    }
	
	
    delete() {
		this.edificioService.delete(this.edificio);
		
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
