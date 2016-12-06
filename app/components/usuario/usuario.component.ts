import {Component} from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {UsuarioStore} from "../../services/usuario.store";
import {GrupoService} from "../../services/grupo.service";
import {Grupo} from "../../entities/grupo";
import {Subject} from "rxjs";
import {UsuarioGrupoStore} from "../../services/usuario-grupo.store";



@Component({
    templateUrl: 'app/components/usuario/usuario.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'usuario',
    providers: [UsuarioStore,UsuarioGrupoStore, ConfirmationService]
})
export class UsuarioComponent {

    usuario: Usuario = new Usuario();

    validaciones: Message[] = [];

    msgs: Message[] = [];

    isNew = false;

    diseable : boolean;

    displayDialog: boolean;

    grupos: SelectItem[] = [];

    grupoSelected: Grupo;
   
    selectedValue: string = "1";

    private searchTerms = new Subject<string>();

    constructor(private usuarioStore: UsuarioStore,
                private confirmationService : ConfirmationService) {
       this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms =>
                this.usuarioStore.setLikes(terms.length > 0 ? {
                   nombre_usuario: '*'+terms+'*', nombre: '*'+terms+'*', apellido: '*'+terms+'*', email: '*'+terms+'*', contrasenia: '*'+terms+'*'} : {})
            )
    }



    showDialogToAdd() {
        this.validaciones = [];
        this.isNew = true;
        this.usuario = new Usuario();
        this.displayDialog = true;
         this.diseable = false;

    }

    onRowSelect(event) {
        this.validaciones = [];
        this.isNew = false;
        this.usuario =new Usuario(event.data);
        this.displayDialog = true;
         this.diseable = true;

    }


    save() {
        if ( !this.usuario.nombre_usuario ||!this.usuario.nombre || !this.usuario.apellido || !this.usuario.email  || (  this.isNew && !this.usuario.contrasenia)) {
            this.validaciones[0] = {
                severity: 'error',
                summary: 'Error',
                detail: 'Complete los campos requeridos'
            };
        }
        else {
            if (this.isNew)
                this.confirmationService.confirm({
                    message: 'Estas seguro que desea agregar el usuario?',
                    header: 'Confirmar ',
                    icon: 'fa ui-icon-warning',
                    accept: () => {
                        this.usuarioStore.create(this.usuario).subscribe(
                            guardada => {
                                this.displayDialog = false;
                                this.msgs.push(
                                    {
                                        severity: 'success',
                                        summary: 'Guardado',
                                        detail: 'Se ha guardado el usuario ' + guardada.nombre + ' con exito!'
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
            //update
            else
                this.confirmationService.confirm({
                    message: 'Estas seguro que desea modificar el usuario?',
                    header: 'Confirmar modificacion',
                    icon: 'fa ui-icon-warning',
                    accept: () => {
                        this.usuarioStore.update(this.usuario).subscribe(
                            guardada => {
                                this.displayDialog = false;
                                this.msgs.push(
                                    {
                                        severity: 'success',
                                        summary: 'Guardada',
                                        detail: 'Se han guardado los cambios a ' + guardada.nombre + ' con exito!'
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
                                severity: 'error',
                                summary: error.json().error.title,
                                detail: error.json().error.detail
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
