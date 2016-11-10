import {Component} from '@angular/core';
import {Grupo} from '../entities/grupo';
import {GrupoService} from '../services/grupo.service';

class PrimeGrupo implements Grupo {
    constructor(public id?, public nombre?, public descripcion?) {}
}

@Component({
	templateUrl: './app/grupo/grupo.component.html',
	selector: 'grupo',
	providers:[GrupoService]
})
export class GrupoComponent {

	displayDialog: boolean;

    grupo: Grupo = new PrimeGrupo();

    selectedGrupo: Grupo;

    newGrupo: boolean;

    grupos: Grupo[];

    constructor(private grupoService: GrupoService) { }

    ngOnInit() {
        this.grupoService.getGruposMedium().then(grupos => this.grupos = grupos);
    }

    showDialogToAdd() {
        this.newGrupo = true;
        this.grupo = new PrimeGrupo();
        this.displayDialog = true;
    }

	add(nombre: string, descripcion:string): void {
		nombre = nombre.trim();
		if (!nombre) { return; }
		this.grupoService.create(nombre, descripcion).subscribe(grupo => {
                this.grupo = grupo;
				this.grupos.push(grupo);
				this.selectedGrupo = null;

            }
		 );
	}
	
    save() {
		//insert
        if(this.newGrupo){
			this.add(this.grupo.nombre,this.grupo.descripcion);
		}
		//update
        else{
			this.grupoService.update(this.grupo).then(grupo => {
            this.grupos[this.findSelectedGrupoIndex()] = grupo;
		});
		}
        this.grupo = null;
        this.displayDialog = false;
    }
	
	
    delete() {
		this.grupoService.delete(this.grupo.id);
		
        this.grupos.splice(this.findSelectedGrupoIndex(), 1);
        this.grupo = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newGrupo = false;
        this.grupo = this.cloneGrupo(event.data);
        this.displayDialog = true;
    }

    cloneGrupo(g: Grupo): Grupo {
        let grupo = new PrimeGrupo();
        for(let prop in g) {
            grupo[prop] = g[prop];
        }
        return grupo;
    }

    findSelectedGrupoIndex(): number {
        return this.grupos.indexOf(this.selectedGrupo);
    }
}	
