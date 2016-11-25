/**
 * Created by juan on 24/11/16.
 */
import {Component} from '@angular/core';
import {Message, ConfirmationService} from "primeng/components/common/api";
import {UsuarioGrupo} from "../../entities/usuario-grupo";
import {UsuarioGrupoStore} from "../../services/usuario-grupo.store";

@Component({
    templateUrl: 'app/components/usuario-grupo/usuario-grupo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'usuario-grupo',
    providers: [UsuarioGrupoStore, ConfirmationService]
})
export class UsuarioGrupoComponent {

    msgs: Message[] = [];

    displayDialog: boolean;

    usuarioGrupo: UsuarioGrupo = new UsuarioGrupo();

    isNew: boolean;

    constructor(private usuarioGrupoStore: UsuarioGrupoStore,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {

    }


    showDialogToAdd() {
        this.isNew = true;
        this.usuarioGrupo = new UsuarioGrupo();
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.usuarioGrupo = new UsuarioGrupo(event.data);
        this.displayDialog = true;
    }

    save() {
        if (this.isNew) {
            this.usuarioGrupoStore.create(this.usuarioGrupo)
                .subscribe(
                    creada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity: 'success',
                                summary: 'Creada',
                                detail: 'Se ha agregado el permiso ' + creada.usuario.nombre + ' con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity: 'error',
                                summary: 'Error',
                                detail: 'No se ha podido crear el permiso:\n' + error
                            });
                    });
        }

        //update
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea modificar el permiso?',
                header: 'Confirmar modificacion',
                icon: 'fa fa-pencil-square-o',
                accept: () => {
                    this.usuarioGrupoStore.update(this.usuarioGrupo).subscribe(
                        guardada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Guardada',
                                    detail: 'Se han guardado los cambios a ' + guardada.usuario.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se ha podido guardar el permiso:\n' + error
                                });
                        });
                }
            });
    }


    delete() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea eliminar la permiso?',
            header: 'Confirmar eliminacion',
            icon: 'fa fa-trash',
            accept: () => {
                this.usuarioGrupoStore.delete(this.usuarioGrupo).subscribe(
                    borrada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity: 'success',
                                summary: 'Borrado',
                                detail: 'Se ha borrado ' + borrada.usuario.nombre + ' con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity: 'error',
                                summary: 'Error',
                                detail: 'No se ha podido eliminar:\n' + error
                            });
                    }
                );
            }
        });
    }

    message(evento: string) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Exito', detail: 'Permiso ' + evento + ' con exito!'});
    }

    pageChange(event) {
        let qo = {
            size: event.rows,
            page: event.page + 1
        };
        console.log(qo);

        this.usuarioGrupoStore.mergeQueryOptions(qo);
    }

    sort(event) {
        this.usuarioGrupoStore.setSorts([event]);
    }

}