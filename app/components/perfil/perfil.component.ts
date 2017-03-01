import {Component, Input, ViewChild, Output} from "@angular/core";
import {ConfirmationService, Message} from "primeng/components/common/api";
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {MessagesService} from "../../services/messages.service";
import {Dialog} from "primeng/components/dialog/dialog";
import {EventEmitter} from "@angular/forms/src/facade/async";

@Component({
    selector: 'perfil',
    templateUrl: 'app/components/perfil/perfil.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    providers: [ConfirmationService]
})

export class PerfilComponent {
    @Input() usuario: Usuario;
    _displayDialog: boolean;
    @Output()
    visibleChange = new EventEmitter<boolean>();

    oldpass: string;
    newpass: string;
    error = '';

    constructor(private ConfirmationService: ConfirmationService,
                private usuarioService: UsuarioService,
                private messagesService: MessagesService) {
    }

    @Input() set visible(visible : boolean) {
        this._displayDialog = visible;

    }

    get visible(): boolean {
        return this._displayDialog;
    }


    change() {
        this.usuarioService.change_password(this.usuario.email, this.oldpass, this.newpass)
            .subscribe(result => {
                this._displayDialog = false;
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