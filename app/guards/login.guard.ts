import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('Authorization')) {
			this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}