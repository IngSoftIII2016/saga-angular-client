///<reference path="../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, ElementRef, OnInit, AfterViewInit} from "@angular/core";
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

    constructor(private router: Router, private el: ElementRef) {

    }
    ngAfterViewChecked(): void {
        console.log('mostrar: ' + this.mostrar())
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
        return (this.router.url != '/login' && this.router.url !='/404');
    }
    
	logout(): void {
        localStorage.removeItem('Authorization');
        this.router.navigate(['/login']);
    }

}
