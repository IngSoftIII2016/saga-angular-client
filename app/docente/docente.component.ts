import {Component} from '@angular/core';
import {Docente} from '../_entities/docente';
import {DocenteService} from '../_services/docente.service';

class PrimeDocente implements Docente {
    constructor(public id?, public nombre?, public apellido?) {}
}

@Component({
	templateUrl: './app/docente/docente.component.html',
	selector: 'docente',
	providers:[DocenteService]
})
export class DocenteComponent {

	displayDialog: boolean;

    docente: Docente = new PrimeDocente();

    selectedDocente: Docente;

    newDocente: boolean;

    docentes: Docente[];

    constructor(private docenteService: DocenteService) { }

    ngOnInit() {
        this.docenteService.getDocentesMedium().then(docentes => this.docentes = docentes);
    }

    showDialogToAdd() {
        this.newDocente = true;
        this.docente = new PrimeDocente();
        this.displayDialog = true;
    }

	add(nombre: string, apellido:string): void {
		nombre = nombre.trim();
		if (!nombre) { return; }
		this.docenteService.create(nombre, apellido).subscribe(docente => {
                this.docente = docente;
				this.docentes.push(docente);
				this.selectedDocente = null;

            }
		 );
	}
	
    save() {
		//insert
        if(this.newDocente){
			this.add(this.docente.nombre,this.docente.apellido);
		}
		//update
        else{
			this.docenteService.update(this.docente).then(docente => {
            this.docentes[this.findSelectedDocenteIndex()] = docente;
		});
		}
        this.docente = null;
        this.displayDialog = false;
    }
	
	
    delete() {
		this.docenteService.delete(this.docente.id);
		
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
        let docente = new PrimeDocente();
        for(let prop in d) {
            docente[prop] = d[prop];
        }
        return docente;
    }

    findSelectedDocenteIndex(): number {
        return this.docentes.indexOf(this.selectedDocente);
    }
}	
