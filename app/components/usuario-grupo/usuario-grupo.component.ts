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
import {CRUD} from "../../commons/crud";
import {UsuarioGrupoService} from "../../services/usuario-grupo.service";

@Component({
    templateUrl: 'app/components/usuario-grupo/usuario-grupo.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'usuario-grupo',
    providers: [UsuarioGrupoStore, GrupoService, UsuarioService, ConfirmationService]
})
export class UsuarioGrupoComponent extends CRUD<UsuarioGrupo, UsuarioGrupoService, UsuarioGrupoStore>{

    grupos: SelectItem[] = [];

    usuarios: SelectItem[] = [];


    constructor(private usuarioGrupoStore: UsuarioGrupoStore,
                private usuarioService: UsuarioService,
                private grupoService: GrupoService,
                private confirmationService: ConfirmationService) {
        super(usuarioGrupoStore,confirmationService);
      }

      ngOnInit(){
        super.ngOnInit();
          var sel = this;
          this.grupoService.getAll().subscribe(grupos => {
              sel.grupos = grupos.map(grupo => {
                      return {label: grupo.nombre + ' - ' + grupo.descripcion, value: grupo}
                  }
              )
          });
          this.usuarioService.getAll().subscribe(usuarios => {
              sel.usuarios = usuarios.map(usuario => {
                      return {label: usuario.nombre + ' - ' + usuario.apellido, value: usuario}
                  }
              )
          });
      }

    protected getDefaultNewEntity(): UsuarioGrupo {
        return new UsuarioGrupo();
    }

    protected getEntityFromEvent(event: any): UsuarioGrupo {
        return new UsuarioGrupo(event.data);
    }

    protected getEntityReferencedLabel(): string {
        return 'el permiso para el usuario ' + this.entity.usuario.nombre + ' con rol ' + this.entity.grupo.nombre;
    }

    protected getSearchFields(): string[] {
        return ['usuario.nombre' , 'grupo.nombre']
    }

}