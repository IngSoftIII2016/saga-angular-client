/**
 * Created by juan on 24/11/16.
 */
import {Component} from '@angular/core';
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {UsuarioGrupo} from "../../entities/usuario-grupo";
import {UsuarioGrupoStore} from "../../services/usuario-grupo.store";
import {GrupoService} from "../../services/grupo.service";
import {Grupo} from "../../entities/grupo";
import {Subject} from "rxjs";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../entities/usuario";

@Component({
    templateUrl: 'app/components/usuario-grupo/usuario-grupo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'usuario-grupo',
    providers: [UsuarioGrupoStore, GrupoService, UsuarioService, ConfirmationService]
})
export class UsuarioGrupoComponent {

    msgs: Message[] = [];

    displayDialog: boolean;

    usuarioGrupo: UsuarioGrupo = new UsuarioGrupo();

    isNew: boolean;

    grupos: SelectItem[] = [];

    grupoSelected: Grupo;

    usuarios: SelectItem[] = [];

    usuarioSelected: Usuario;

    private searchTerms = new Subject<string>();

    constructor(private usuarioGrupoStore: UsuarioGrupoStore,
                private usuarioService: UsuarioService,
                private grupoService: GrupoService,
                private confirmationService: ConfirmationService) {
        var sel = this;
        this.grupoService.getAll().subscribe(grupos => {
            grupos.forEach(grupo => {
                    sel.grupos.push({
                            label: grupo.nombre + ' - ' + grupo.descripcion, value: new Grupo (grupo)
                        }
                    )
                }
            )
        });
        var sel = this;
        this.usuarioService.getAll().subscribe(usuarios => {
            usuarios.forEach(usuario => {
                    sel.usuarios.push({
                            label: usuario.nombre + ' - ' + usuario.apellido, value: new Usuario (usuario)
                        }
                    )
                }
            )
        });
    }

    showDialogToAdd() {
        this.isNew = true;
        this.usuarioGrupo = new UsuarioGrupo();
        this.grupoSelected = this.grupos[0].value;
        this.usuarioSelected = this.usuarios[0].value;
        this.displayDialog = true;
    }

    onRowSelect(event) {
        this.isNew = false;
        this.usuarioGrupo = new UsuarioGrupo(event.data);
        this.grupoSelected =  new Grupo(this.usuarioGrupo.grupo);
        this.usuarioSelected =  new Usuario(this.usuarioGrupo.usuario);
        this.displayDialog = true;
    }

    save() {
        this.usuarioGrupo.grupo = new Grupo(this.grupoSelected);
        this.usuarioGrupo.usuario = new Usuario(this.usuarioSelected);
        if (this.isNew) {
            this.confirmationService.confirm({
                message: 'Estas seguro que desea agregar el permiso?',
                header: 'Confirmar ',
                icon: 'fa ui-icon-warning',
                accept: () => {
            this.usuarioGrupoStore.create(this.usuarioGrupo)
                .subscribe(
                    creada => {
                        this.displayDialog = false;
                        this.msgs.push(
                            {
                                severity: 'success',
                                summary: 'Creada',
                                detail: 'Se ha agregado el permiso ' + creada.grupo.nombre + ' con exito!'
                            })
                    },
                    error => {
                        this.msgs.push(
                            {
                                severity: 'error',
                                summary: error.json().error.title,
                                detail: error.json().error.detail
                            });
                    });
                }
            });
        }
        //update
        else
            this.confirmationService.confirm({
                message: 'Estas seguro que desea modificar el permiso?',
                header: 'Confirmar modificacion',
                icon: 'fa ui-icon-warning',
                accept: () => {
                    this.usuarioGrupoStore.update(this.usuarioGrupo).subscribe(
                        guardada => {
                            this.displayDialog = false;
                            this.msgs.push(
                                {
                                    severity: 'success',
                                    summary: 'Guardada',
                                    detail: 'Se han guardado los cambios a ' + guardada.grupo.nombre + ' con exito!'
                                })
                        },
                        error => {
                            this.msgs.push(
                                {
                                    severity: 'error',
                                    summary: error.json().error.title,
                                    detail: error.json().error.detail
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
                                summary: error.json().error.title,
                                detail: error.json().error.detail
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