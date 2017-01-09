import {Component, ElementRef} from "@angular/core";
import {Router} from '@angular/router';
declare var Ultima: any;


@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    styleUrls: ['app/components/app.component.css']

})
export class AppComponent {

    layoutCompact: boolean = true;

    layoutMode: string = 'static';
    
    darkMenu: boolean = false;
    
    profileMode: string = 'inline';

    displayLayout:string;

    ultima: boolean = false;
	 
	nombre_apellido: string;


    constructor(private router: Router, private el: ElementRef) {
    }
    ngAfterViewChecked(): void {
        if(this.mostrar()) {
            if (!this.ultima) {
                console.log('Inicializando ultima')
                Ultima.init(this.el.nativeElement);
                this.ultima = true;
            }
        }else{
            console.log('DesInicializando ultima')
            this.ultima = false;
        }

    }

    mostrar(): boolean{
		this.nombre_apellido=localStorage.getItem('Nombre_Apellido');

        return (this.router.url != '/login' && this.router.url !='/404');
    }

	logout(): void {
        localStorage.removeItem('Authorization');
	    localStorage.removeItem('Usuario');
		localStorage.removeItem('Nombre_Apellido');

        this.router.navigate(['/login']);
    }

}
