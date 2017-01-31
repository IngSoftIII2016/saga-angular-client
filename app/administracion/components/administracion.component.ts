/**
 * Created by juan on 05/01/17.
 */
import {Component, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {Usuario} from "../../entities/usuario";
import {AuthenticationService} from "../../services/authentication.service";
import * as menu from './administracion-menu';
import {Accion} from "../../entities/accion";
import {administracionMenuItems} from "./administracion-menu";
import {getUnique} from "../../commons/utils";


declare var Ultima: any;
@Component({
    templateUrl: 'app/administracion/components/administracion.component.html',
    styleUrls: ['app/administracion/components/administracion.component.css'],
    selector: 'administracion'
})
export class AdministracionComponent {

    layoutCompact: boolean = true;

    layoutMode: string = 'static';

    darkMenu: boolean = false;

    profileMode: string = 'inline';

    displayLayout: string;

    usuario: Usuario = null;

    isInvitado : boolean = true;

    display_perfil : boolean;

    menuItems = [];

    constructor(private router: Router, private el: ElementRef, private authService: AuthenticationService) {
    }

    ngOnInit() {
        let self = this;
        this.authService.usuario.subscribe(function (usuario) {
            self.usuario = usuario;
            self.menuItems = [];
            let menuRecursos = usuario.isInvitado() ? [] :
                getUnique(usuario.rol.acciones.map(accion => accion.recurso));
            menuRecursos.unshift('Grilla');
            self.menuItems = menuRecursos.map(function(recurso) {
                if([recurso])
                    return {recurso: recurso, path: administracionMenuItems[recurso]}
            });
            self.isInvitado = usuario.isInvitado();
        });
        this.authService.getUsuario().subscribe(res => res);
    }

    ngAfterViewInit() {
        Ultima.init(this.el.nativeElement);
    }

    login(): void {
        this.router.navigate(['../login']);
    }

    logout(): void {
        console.log('logout');
        this.authService.logout().subscribe(res => this.router.navigate(['/']));
    }

    showPerfilDialog() : void {
        this.display_perfil = false;
        this.display_perfil = true;
    }
}