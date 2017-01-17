import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate() {
        if(!localStorage.getItem('Authorization')) {
            let self = this;
            this.authService.login('invitado', 'invitado')
                .subscribe(
                    res => self.router.navigate(['administracion']),
                    err => self.router.navigate([''])
            );
            return false;
        }
        return true;
    }
}