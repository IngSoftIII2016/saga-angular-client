import {Component} from '@angular/core';
import {Docente} from '../../entities/docente';
import {DocenteService} from '../../services/docente.service';
import {QueryOptions} from "../../services/generic.service";

/*class PrimeDocente implements Docente {
    constructor(public id?, public nombre?, public apellido?) {}
}
*/
@Component({
	templateUrl: 'app/components/docente/docente.component.html',
	selector: 'docente',
	providers:[DocenteService]
})
export class DocenteComponent {

    queryOptions: QueryOptions = new QueryOptions();

	displayDialog: boolean;

    docente: Docente = new Docente();

    selectedDocente: Docente;

    newDocente: boolean;

    docentes: Docente[];

    constructor(private docenteService: DocenteService) { }

    ngOnInit() {
        this.docenteService.query(this.queryOptions).subscribe(docentes => this.docentes = docentes);
    }

    showDialogToAdd() {
        this.newDocente = true;
        this.docente = new Docente();
        this.displayDialog = true;
    }

	add(docente : Docente): void {
		this.docenteService.create(docente).subscribe(docente => {
                this.docente = docente;
				this.docentes.push(docente);
				this.selectedDocente = null;

            }
		 );
	}
	
    save() {
		//insert
        if(this.newDocente){
			this.add(this.docente);
		}
		//update
        else{
			this.docenteService.update(this.docente).subscribe(docente => {
            this.docentes[this.findSelectedDocenteIndex()] = docente;
		});
		}
        this.docente = null;
        this.displayDialog = false;
    }
	
	
    delete() {
		this.docenteService.delete(this.docente);
		
        this.docentes.splice(this.findSelectedDocenteIndex(), 1);
        this.docente = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newDocente = false;
        this.docente = this.cloneDocente(event.data);
        this.displayDialog = true;
    }

    cloneDocente(d: Docente): Docente {
        let docente = new Docente();
        for(let prop in d) {
            docente[prop] = d[prop];
        }
        return docente;
    }

    findSelectedDocenteIndex(): number {
        return this.docentes.indexOf(this.selectedDocente);
    }
}	
