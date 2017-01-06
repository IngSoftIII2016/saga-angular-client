import {Component} from '@angular/core';
import {Usuario} from "../../entities/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Message, ConfirmationService, SelectItem} from "primeng/components/common/api";
import {UsuarioStore} from "../../services/usuario.store";
import {GrupoService} from "../../services/grupo.service";
import {Grupo} from "../../entities/grupo";
import {Subject} from "rxjs";
import {UsuarioGrupoStore} from "../../services/usuario-grupo.store";
import {CRUD} from "../../commons/crud";



@Component({
    templateUrl: 'app/components/usuario/usuario.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'usuario',
    providers: [UsuarioStore,UsuarioGrupoStore, ConfirmationService]
})
export class UsuarioComponent extends CRUD<Usuario, UsuarioService, UsuarioStore>{

      constructor(private usuarioStore: UsuarioStore,
                private confirmationService : ConfirmationService) {
      super(usuarioStore,confirmationService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected getDefaultNewEntity(): Usuario {
        return new Usuario();
    }

    protected getEntityFromEvent(event: any): Usuario {
        return new Usuario(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'el usuario ' + this.entity.nombre + ' ' + this.entity.apellido;
    }

    protected getSearchFields(): string[] {
        return ['nombre_usuario' , 'nombre', 'apellido', 'email', 'telefono']
    }

}	
