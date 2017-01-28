/**
 * Created by juan on 05/01/17.
 */
import {Component, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {Usuario} from "../../entities/usuario";
import {AuthenticationService} from "../../services/authentication.service";
import {Observable} from "rxjs";
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

    constructor(private router: Router, private el: ElementRef, private authService: AuthenticationService) {
        //this.usuario = JSON.parse(localStorage.getItem('Usuario')) as Usuario;
    }

    ngOnInit() {
        let self = this;
        this.authService.usuario.subscribe(function (usuario) {
            console.log('usuario OnInit')
            console.log(usuario);
            self.usuario = usuario;
            self.nombre_apellido = usuario.nombre + ' ' + usuario.apellido;
        });
        this.authService.getUsuario().subscribe();
    }

    ngAfterViewInit() {
        Ultima.init(this.el.nativeElement);
    }

    isInvitado(): Observable<boolean> {
        return this.authService.getUsuario().map(user => user.isInvitado());
    }

    login(): void {
        this.router.navigate(['../login']);
    }

    logout(): void {
        this.authService.logout();
    }
}