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
        this.nombre_apellido = localStorage.getItem('Nombre_Apellido');
    }

    ngAfterViewInit() {
        Ultima.init(this.el.nativeElement);
    }

    logout(): void {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('Usuario');
        localStorage.removeItem('Nombre_Apellido');
        this.router.navigate(['/login']);
    }
}