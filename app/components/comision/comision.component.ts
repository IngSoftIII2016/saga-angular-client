import {Component} from '@angular/core';
import {Comision} from "../../entities/comision";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {ComisionStore} from "../../services/comision.store";
import {Subject} from "rxjs";


@Component({
    templateUrl: 'app/components/comision/comision.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'comision',
    providers:[ComisionStore, ConfirmationService]
})
export class ComisionComponent {

    msgs: Message[] = [];

    displayDialog: boolean;

    comision: Comision = new Comision();

    isNew: boolean;

    private searchTerms = new Subject<string>();

    constructor(private comisionStore: ComisionStore,  private confirmationService : ConfirmationService) { }

    ngOnInit() {
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.comisionStore.setLikes(terms.length > 0 ? {nombre: '*'+terms+'*', 'asignatura.nombre': '*'+terms+'*'} : {}))
    }

    showDialogToAdd() {
        this.isNew = true;
        this.comision = new Comision();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.comision =new Comision(event.data);
        this.displayDialog = true;
    }

    save() {
        this.comisionStore.save(this.comision).subscribe(
            guardada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity:'success',
                        summary:'Guardado',
                        detail:'Se ha guardado la clase con exito!'
                    })
            },
            error => {
                this.msgs.push(
                    {
                        severity:'error',
                        summary:'Error',
                        detail:'No se ha podido guardar la clase:\n' + error
                    });
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la clase?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
            accept: () => {
                this.comisionStore.delete(this.comision).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity:'success',
                                summary:'Exito',
                                detail:'Se ha borrado la clase con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity:'error',
                                summary:'Error',
                                detail:'No se ha podido eliminar la clase:\n' + error
                            });
                    }
                );
            }
        });
    }

    pageChange(event) {
        let qo = {
            size: event.rows,
            page: event.page + 1
        };
        console.log(qo);

        this.comisionStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.comisionStore.setSorts([event]);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }


}	/**
 * Created by Federico on 17/11/2016.
 */
