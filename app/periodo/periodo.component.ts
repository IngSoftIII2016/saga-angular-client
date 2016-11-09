import {Component} from '@angular/core';
import {Periodo} from '../_entities/periodo';
import {PeriodoService} from '../_services/periodo.service';

class PrimePeriodo implements Periodo {
    constructor(public id?, public fecha_inicio?, public fecha_fin?, public descripcion?) {}
}

@Component({
	templateUrl: './app/periodo/periodo.component.html',
	selector: 'periodo',
	providers:[PeriodoService]
})
export class PeriodoComponent {

	displayDialog: boolean;

    periodo: Periodo= new PrimePeriodo();

    selectedPeriodo: Periodo;

    newPeriodo: boolean;

    periodos: Periodo[];

    constructor(private periodoService: PeriodoService) { }

    ngOnInit() {
        this.periodoService.getPeriodosMedium().then(periodos => this.periodos = periodos);
    }

    showDialogToAdd() {
        this.newPeriodo = true;
        this.periodo = new PrimePeriodo();
        this.displayDialog = true;
    }

	add(fecha_inicio:Date, fecha_fin:Date, descripcion:string): void {
		descripcion = descripcion.trim();
		if (!descripcion) { return; }
		this.periodoService.create(fecha_inicio, fecha_fin,descripcion).subscribe(periodo => {
                this.periodo = periodo;
				this.periodos.push(periodo);
				this.selectedPeriodo = null;

            }
		 );
	}
	
    save() {
		//insert
        if(this.newPeriodo){
			this.add(this.periodo.fecha_inicio, this.periodo.fecha_fin, this.periodo.descripcion);
		}
		//update
        else{
			this.periodoService.update(this.periodo).then(periodo => {
            this.periodos[this.findSelectedPeriodoIndex()] = periodo;
		});
		}
        this.periodo = null;
        this.displayDialog = false;
    }
	
	
    delete() {
		this.periodoService.delete(this.periodo.id);
		
        this.periodos.splice(this.findSelectedPeriodoIndex(), 1);
        this.periodo = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newPeriodo = false;
        this.periodo = this.clonePeriodo(event.data);
        this.displayDialog = true;
    }

    clonePeriodo(p: Periodo): Periodo{
        let periodo = new PrimePeriodo();
        for(let prop in p) {
            periodo[prop] = p[prop];
        }
        return periodo;
    }

    findSelectedPeriodoIndex(): number {
        return this.periodos.indexOf(this.selectedPeriodo);
    }
}	
