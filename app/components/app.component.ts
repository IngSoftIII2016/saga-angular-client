import {Component, ElementRef} from "@angular/core";
import {Router} from '@angular/router';
declare var Ultima: any;


@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    styleUrls: ['app/components/app.component.css']

})
export class AppComponent  {

    layoutCompact: boolean = true;

    layoutMode: string = 'static';
    
    darkMenu: boolean = false;
    
    profileMode: string = 'inline';

    displayLayout:string;

    constructor(private router: Router,private el: ElementRef) {

    }
 
    mostrar(): boolean{
		
        if (this.router.url != '/login' && this.router.url !='/404')
        {
			Ultima.init(this.el.nativeElement);
            this.displayLayout='layout-main';
            return true;
        }
        else {
            this.displayLayout='';
            return false
        }

    }
	logout(): void {
        localStorage.removeItem('Authorization');
        this.router.navigate(['/login']);
    }

}
