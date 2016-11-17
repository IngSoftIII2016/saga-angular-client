import {Component} from '@angular/core';
import {Grupo} from '../../entities/grupo';
import {GrupoService} from '../../services/grupo.service';
import {QueryOptions} from "../../services/generic.service";


@Component({
	templateUrl: 'app/components/grupo/grupo.component.html',
	selector: 'grupo',
	providers:[GrupoService]
})
export class GrupoComponent {
    queryOptions: QueryOptions = new QueryOptions();

	displayDialog: boolean;

    grupo: Grupo = new Grupo();

    selectedGrupo: Grupo;

    newGrupo: boolean;

    grupos: Grupo[];

    constructor(private grupoService: GrupoService) { }

    ngOnInit() {
        this.grupoService.query(this.queryOptions).subscribe(grupos => this.grupos = grupos);
    }

    showDialogToAdd() {
        this.newGrupo = true;
        this.grupo = new Grupo();
        this.displayDialog = true;
    }

	add(grupo: Grupo): void {
		this.grupoService.create(grupo).subscribe(grupo => {
                this.grupo = grupo;
				this.grupos.push(grupo);
				this.selectedGrupo = null;

            }
		 );
	}
	
    save() {
		//insert
        if(this.newGrupo){
			this.add(this.grupo);
		}
		//update
        else{
			this.grupoService.update(this.grupo).subscribe(grupo => {
            this.grupos[this.findSelectedGrupoIndex()] = grupo;
		});
		}
        this.grupo = null;
        this.displayDialog = false;
    }
	
	
    delete() {
		this.grupoService.delete(this.grupo);
		
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
        let grupo = new Grupo();
        for(let prop in g) {
            grupo[prop] = g[prop];
        }
        return grupo;
    }

    findSelectedGrupoIndex(): number {
        return this.grupos.indexOf(this.selectedGrupo);
    }
}	
