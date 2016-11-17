import {Component} from '@angular/core';
import {Carrera} from '../../entities/carrera';
import {CarreraService} from '../../services/carrera.service';
import {QueryOptions} from "../../services/generic.service";


@Component({
	templateUrl: 'app/components/carrera/carrera.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'carrera',
	providers:[CarreraService]
})
export class CarreraComponent {

    queryOptions: QueryOptions = new QueryOptions();

	displayDialog: boolean;

    carrera: Carrera = new Carrera();

    selectedCarrera: Carrera;

    newCarrera: boolean;

    carreras: Carrera[];

    constructor(private carreraService: CarreraService) { }

    ngOnInit() {
        this.carreraService.query(this.queryOptions).subscribe(carreras => this.carreras = carreras);
    }

    showDialogToAdd() {
        this.newCarrera = true;
        this.carrera = new Carrera();
        this.displayDialog = true;
    }

	add(carrera: Carrera): void {
		this.carreraService.create(carrera).subscribe(carrera => {
                this.carrera = carrera;
				this.carreras.push(carrera);
				this.selectedCarrera = null;

            }
		 );
	}
	
    save() {
		//insert
        if(this.newCarrera){
			this.add(this.carrera);
		}
		//update
        else{
			this.carreraService.update(this.carrera).subscribe(carrera => {
            this.carreras[this.findSelectedCarreraIndex()] = carrera;
		});
		}
        this.carrera = null;
        this.displayDialog = false;
    }
	
	
    delete() {
		this.carreraService.delete(this.carrera);
		
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
        let carrera = new Carrera();
        for(let prop in c) {
            carrera[prop] = c[prop];
        }
        return carrera;
    }

    findSelectedCarreraIndex(): number {
        return this.carreras.indexOf(this.selectedCarrera);
    }
}	
