import {Component} from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {UsuarioStore} from "../../services/usuario.store";



@Component({
    templateUrl: 'app/components/usuario/usuario.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'usuario',
    providers: [UsuarioStore, ConfirmationService]
})
export class UsuarioComponent {

    usuario: Usuario = new Usuario();

    msgs: Message[] = [];

    isNew = false;

    displayDialog: boolean;

    constructor(private usuarioStore: UsuarioStore,  private confirmationService : ConfirmationService) { }



    showDialogToAdd() {
        this.isNew = true;
        this.usuario = new Usuario();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.usuario =new Usuario(event.data);
        this.displayDialog = true;
    }

    save() {
        this.usuarioStore.save(this.usuario).subscribe(
            guardada => {
                this.displayDialog = false;
                this.msgs.push(
                    {
                        severity:'success',
                        summary:'Guardado',
                        detail:'Se ha guardado el usuario '+ guardada.nombre + ' con exito!'
                    })
            },
            error => {
                this.msgs.push(
                    {
                        severity:'error',
                        summary:'Error',
                        detail:'No se ha podido guardar el usuario:\n' + error
                    });
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar el usuario?',
            header: 'Confirmar eliminacion',
            icon: 'fa ui-icon-delete',
            accept: () => {
                this.usuarioStore.delete(this.usuario).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity:'success',
                                summary:'Exito',
                                detail:'Se ha borrado el usuario '+ borrada.nombre + ' con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity:'error',
                                summary:'Error',
                                detail:'No se ha podido eliminar el usuario:\n' + error
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

        this.usuarioStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.usuarioStore.setSorts([event]);
    }

}	
