import {Component, Input} from "@angular/core";
import {ConfirmationService, Message} from "primeng/components/common/api";
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {MessagesService} from "../../services/messages.service";

@Component({
    selector: 'perfil',
    templateUrl: 'app/components/perfil/perfil.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    providers: [ConfirmationService]
})

export class PerfilComponent {
    @Input() usuario: Usuario
    @Input() displayDialog: boolean
    oldpass: string;
    newpass: string;
    error = '';
    public msgs: Message[] = [];

    constructor(private ConfirmationService: ConfirmationService,
                private usuarioService: UsuarioService,
                private messagesService: MessagesService) {

    }

    change() {
        this.usuarioService.change_password(this.usuario.email, this.oldpass, this.newpass)
            .subscribe(result => {
                this.messagesService.showMessage({
                    severity: 'success',
                    summary: 'Guardada',
                    detail: 'Contraseña cambiada con exito!'
                })
            }, err => {
                this.messagesService.showMessage({
                    severity: 'failed',
                    summary: 'Error',
                    detail: 'No se pudo guardar la contraseña. compruebe su contraseña actual.'
                })

            });
    }


}