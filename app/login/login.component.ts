import {Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ButtonModule,PasswordModule,InputTextModule} from 'primeng/primeng';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'login-component',
    templateUrl: 'app/login/login.component.html'

})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'El usuario o contraseña  es incorrecto';
                    this.loading = false;
                }
            });
    }
}
