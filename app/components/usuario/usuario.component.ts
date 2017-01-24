import {Component} from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {ConfirmationService, SelectItem} from "primeng/components/common/api";
import {UsuarioStore} from "../../services/usuario.store";
import {RolService} from "../../services/rol.service";
import {Rol} from "../../entities/rol";\

import { Http, Response } from '@angular/http';

import {CRUD} from "../../commons/crud";

@Component({
    templateUrl: 'app/components/usuario/usuario.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'usuario',
    providers: [UsuarioStore, ConfirmationService, RolService]
})
export class UsuarioComponent extends CRUD<Usuario, UsuarioService, UsuarioStore>{

    roles: SelectItem[] = [];

      constructor(private usuarioStore: UsuarioStore,
                  private confirmationService : ConfirmationService,
                  private rolService : RolService,
                  private http: Http) {
      super(usuarioStore,confirmationService);
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
            rol: this.roles[0].value as Rol
        });
    }

    protected getEntityFromEvent(event: any): Usuario {
        return new Usuario(event.data);
    }

    protected getEntityReferencedLabel(entity): string {
        return 'el usuario ' + entity.nombre + ' ' + entity.apellido;
    }

    protected getSearchFields(): string[] {
        return ['nombre_usuario' , 'nombre', 'apellido', 'email']
    }

    resetPass(entity){
        var email = entity.email;
        this.confirmationService.confirm({
            message: 'Esta seguro que quiere generar una nueva contraseña?',
            header: 'Confirmar ',
            icon: 'fa ui-icon-warning',
            accept: () => {
                return this.http.post('http://localhost/saga/api/UsuarioEndpoint/reset_pass', ({'data':{ 'email': email}}))
                    .map((response: Response) => {
                        return true;
                    });
            }
        });
    }
}	
