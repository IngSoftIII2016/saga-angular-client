/**
 * Created by juan on 05/01/17.
 */
import {Component, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {Usuario} from "../../entities/usuario";
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

    usuario: Usuario;

    nombre_apellido: string;

    constructor(private router: Router, private el: ElementRef) {
        this.usuario = JSON.parse(localStorage.getItem('Usuario')) as Usuario;
        this.nombre_apellido = this.usuario.nombre + ' ' + this.usuario.apellido;
    }

    ngAfterViewInit() {
        Ultima.init(this.el.nativeElement);
    }

    isInvitado() {
        return this.usuario.rol.id == 1;
    }

    logout(): void {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('Usuario');
        this.router.navigate(['/']);
    }
}