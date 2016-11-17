import {Component} from '@angular/core';
import {QueryOptions} from "../../services/generic.service";
import {EventoService} from "../../services/evento.service";
import {Evento} from "../../entities/evento";


@Component({
    templateUrl: '/app/components/evento/evento.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'evento',
    providers:[EventoService]
})
export class EventoComponent {

    queryOptions : QueryOptions = new QueryOptions();

    displayDialog: boolean;

    evento: Evento= new Evento();

    selectedEvento: Evento;

    newEvento: boolean;

    eventos: Evento[];

    constructor(private eventoService: EventoService) { }

    ngOnInit() {
        this.eventoService.query(this.queryOptions).subscribe(eventos => this.eventos = eventos);
    }

    showDialogToAdd() {
        this.newEvento = true;
        this.evento = new Evento();
        this.displayDialog = true;
    }

    add(evento: Evento): void {
        this.eventoService.create(evento).subscribe(evento => {
                this.evento = evento;
                this.eventos.push(evento);
                this.selectedEvento= null;

            }
        );
    }

    save() {
        //insert
        if(this.newEvento){
            this.add(this.evento);
        }
        //update
        else{
            this.eventoService.update(this.evento).subscribe(evento => {
                this.eventos[this.findSelectedEventoIndex()] = evento;
            });
        }
        this.evento = null;
        this.displayDialog = false;
    }


    delete() {
        this.eventoService.delete(this.evento);

        this.eventos.splice(this.findSelectedEventoIndex(), 1);
        this.evento = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newEvento = false;
        this.evento = this.cloneEvento(event.data);
        this.displayDialog = true;
    }

    cloneEvento(e: Evento): Evento{
        let evento = new Evento();
        for(let prop in e) {
            evento[prop] = e[prop];
        }
        return evento;
    }

    findSelectedEventoIndex(): number {
        return this.eventos.indexOf(this.selectedEvento);
    }
}	/**
 * Created by Federico on 17/11/2016.
 */
/**
 * Created by Federico on 17/11/2016.
 */
