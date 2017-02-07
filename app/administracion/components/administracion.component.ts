/**
 * Created by juan on 05/01/17.
 */
import {Component, ElementRef, ChangeDetectorRef} from "@angular/core";
import {Router} from "@angular/router";
import {Usuario} from "../../entities/usuario";
import {AuthenticationService} from "../../services/authentication.service";
import {administracionMenuItems} from "./administracion-menu";
import {getUnique} from "../../commons/utils";
import {Message} from "primeng/components/common/api";
import {MessagesService} from "../../services/messages.service";


declare var Ultima: any;
@Component({
    templateUrl: 'app/administracion/components/administracion.component.html',
    styleUrls: ['app/administracion/components/administracion.component.css'],
    selector: 'administracion'
})
export class AdministracionComponent {

    layoutCompact: boolean = true;

    topBarItemChange: boolean = false;

    color: string = 'white';

    layoutMode: string = 'static';

    darkMenu: boolean = false;

    profileMode: string = 'inline';

    displayLayout: string;

    usuario: Usuario = null;

    isInvitado : boolean = true;

    display_perfil : boolean;

    menuItems = [];

    msgs: Message[] = [];

    constructor(
        private router: Router,
        private el: ElementRef,
        private authService: AuthenticationService,
        private messagesService: MessagesService,
        private ref: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        let self = this;
        this.authService.usuario.subscribe(function (usuario) {
            self.usuario = usuario;
            self.menuItems = [];
            let menuRecursos = [];
            if(!usuario.isInvitado()) {
                menuRecursos = getUnique(usuario.rol.acciones.map(accion => accion.recurso));
                menuRecursos.unshift('Presentismo');
                menuRecursos.unshift('Grilla');
            }else menuRecursos.push('Grilla');
            menuRecursos.forEach(function(recurso) { 
                if(administracionMenuItems[recurso])
                    self.menuItems.push({recurso: recurso, path: administracionMenuItems[recurso]});
            });
            self.isInvitado = usuario.isInvitado();
            self.ref.detectChanges();
        });
        this.authService.getUsuario().subscribe(res => res);

        this.messagesService.messageStream.subscribe(msg => self.msgs.push(msg));
    }

    ngAfterViewInit() {
        Ultima.init(this.el.nativeElement);
    }

    login(): void {
        this.router.navigate(['../login']);
    }

    logout(): void {
        this.authService.logout().subscribe(res => this.router.navigate(['/']));
    }

    topbar(): boolean {
        this.colorChange();
        return this.topBarItemChange = !this.topBarItemChange;
    }

    colorChange(){
        if (this.color == 'white')
            this.color= 'black';
        else
            this.color= 'white';
    }

    showPerfilDialog() : void {
        this.display_perfil = false;
        this.display_perfil = true;
    }
}