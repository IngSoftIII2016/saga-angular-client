
import {Component, Input} from "@angular/core";
import {ConfirmationService} from "primeng/components/common/api";
import {Usuario} from "../../entities/usuario";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
    selector: 'perfil',
    templateUrl: 'app/components/perfil/perfil.component.html'
})

export class PerfilComponent  {
   @Input() usuario : Usuario
    @Input() displayDialog : boolean
    oldpass : string;
    newpass : string;
    error = '';
    constructor( private ConfirmationService: ConfirmationService,  private authenticationService: AuthenticationService) {

    }

    change() {
        this.authenticationService.change(this.usuario.email, this.oldpass, this.newpass)
            .subscribe(result => {
            }, err => {
                if (!err.json().error) {
                    this.error = 'No se puede establecer la conexión con el servidor.';

                }
                else {
                    this.error = err.json().error.title;

                }
            });
    }


}