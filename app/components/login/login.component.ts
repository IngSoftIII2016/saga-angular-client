import {Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ButtonModule,PasswordModule,InputTextModule} from 'primeng/primeng';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'login-component',
    templateUrl: 'app/components/login/login.component.html'
})
export class LoginComponent implements OnInit {
	model: any = {};
    loading = false;
    error = '';
	public isNotLogin;
    constructor(
		 
        private router: Router,
        private authenticationService: AuthenticationService) {this.isNotLogin = false; }

    ngOnInit() {
        // reset login status
       // this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                this.router.navigate(['/']);
            }, err => {
                if (!err.json().error) {
                    this.error = 'No se puede establecer la conexión con el servidor.';
                    this.loading = false;
                }
                else {
                    this.error = err.json().error.title;
                    this.loading = false;
                }
            });
    }

    resetear() {
        this.authenticationService.reset(this.model.username)
            .subscribe(result => {
                this.error = 'Reseteo de contraseña exitoso. Revise su correo';
            }, err => {
                if (!err.json().error) {
                    this.error = 'No se puede establecer la conexión con el servidor.';
                    this.loading = false;
                }
                else {
                    this.error = err.json().error.title;
                    this.loading = false;
                }
            });
    }
}
