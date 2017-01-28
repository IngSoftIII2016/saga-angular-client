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

    usuario: Usuario = null;

    isInvitado : boolean = true;

    constructor(private router: Router, private el: ElementRef, private authService: AuthenticationService) {
    }

    ngOnInit() {
        let self = this;
        this.authService.usuario.subscribe(function (usuario) {
            self.usuario = usuario;
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
}