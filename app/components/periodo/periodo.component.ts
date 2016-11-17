import {Component} from '@angular/core';
import {Periodo} from '../../entities/periodo';
import {PeriodoService} from '../../services/periodo.service';
import {QueryOptions} from "../../services/generic.service";


@Component({
	templateUrl: 'app/components/periodo/periodo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
	selector: 'periodo',
	providers:[PeriodoService]
})
export class PeriodoComponent {

    queryOptions : QueryOptions = new QueryOptions();

	displayDialog: boolean;

    periodo: Periodo = new Periodo();

    selectedPeriodo: Periodo;

    newPeriodo: boolean;

    periodos: Periodo[];

    constructor(private periodoService: PeriodoService) { }

    ngOnInit() {
        this.periodoService.query(this.queryOptions).subscribe(periodos => this.periodos = periodos);
    }

    showDialogToAdd() {
        this.newPeriodo = true;
        this.periodo = new Periodo();
        this.displayDialog = true;
    }

	add(periodo: Periodo): void {
		this.periodoService.create(periodo).subscribe(periodo => {
                this.periodo = periodo;
                this.periodos.push(periodo);
                this.selectedPeriodo= null;

            }
		 );
	}
	
    save() {
		//insert
        if(this.newPeriodo){
			this.add(this.periodo);
		}
		//update
        else{
			this.periodoService.update(this.periodo).subscribe(periodo => {
            this.periodos[this.findSelectedPeriodoIndex()] = periodo;
		});
		}
        this.periodo = null;
        this.displayDialog = false;
    }
	
	
    delete() {
		this.periodoService.delete(this.periodo);
		
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
        let periodo = new Periodo();
        for(let prop in p) {
            periodo[prop] = p[prop];
        }
        return periodo;
    }

    findSelectedPeriodoIndex(): number {
        return this.periodos.indexOf(this.selectedPeriodo);
    }
}	
