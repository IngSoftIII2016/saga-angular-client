/**
 * Created by juan on 05/01/17.
 */
import {Component, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
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

    nombre_apellido: string;

    constructor(private router: Router, private el: ElementRef) {
        let user = JSON.parse(localStorage.getItem('Usuario'));
        this.nombre_apellido = user.nombre + ' ' + user.apellido;
    }

    ngAfterViewInit() {
        Ultima.init(this.el.nativeElement);
    }

    logout(): void {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('Usuario');
        this.router.navigate(['/login']);
    }
}