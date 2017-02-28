import {Component} from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {ConfirmationService, SelectItem} from "primeng/components/common/api";
import {UsuarioStore} from "../../services/usuario.store";
import {RolService} from "../../services/rol.service";
import {Rol} from "../../entities/rol";
import {AuthenticationService} from "../../services/authentication.service";

import {Http, Response} from '@angular/http';

import {CRUD} from "../../commons/crud";
import {MessagesService} from "../../services/messages.service";

@Component({
    templateUrl: 'app/components/usuario/usuario.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'usuario',
    providers: [UsuarioStore, RolService, AuthenticationService, ConfirmationService]
})
export class UsuarioComponent extends CRUD<Usuario, UsuarioService, UsuarioStore> {

    roles: SelectItem[] = [];

    constructor(private usuarioStore: UsuarioStore,
                messagesService: MessagesService,
                private confirmationService: ConfirmationService,
                private rolService: RolService,
                private authenticationService: AuthenticationService) {
        super(usuarioStore, messagesService, confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
        var sel = this;
        this.rolService.getAll().subscribe(roles => {
            sel.roles = roles.map(rol => {
                    return {label: rol.nombre, value: rol}
                }
            )
        });
    }

    protected getDefaultNewEntity(): Usuario {
        return new Usuario({
            rol: new Rol(this.roles[0].value)
        });
    }

    protected getEntityFromEvent(event: any): Usuario {
        return new Usuario(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'el usuario ' + entity.nombre + ' ' + entity.apellido;
    }

    protected getEntityName(entity): string {
        return ' el usuario ';
    }

    protected getSearchFields(): string[] {
        return ['nombre_usuario', 'nombre', 'apellido', 'email']
    }

    protected resetPass() {
        this.confirmationService.confirm({
            message: 'Estas seguro que desea resetear el password de ' + this.entity.email + '?',
            header: 'Confirmar ',
            icon: 'fa ui-icon-warning',
            accept: () => {
                this.authenticationService.reset(this.entity.email).subscribe(result => {
                    this.messagesService.showMessage({
                        severity: 'success',
                        summary: 'Generada nueva contraseña',
                        detail: 'Se envio una nueva contraseña al correo del usuario'
                    })
                }, err => {
                    this.messagesService.showMessage({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se pudo resetear la contraseña'
                    });
                });
            }
        });
    }
}	
