﻿import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('Authorization')) {
            // Conectado de modo que devuelva true
            return true;
        }

        // No esta registrado, por lo redirigirá a la página de acceso
        this.router.navigate(['/login']);
        return false;
    }
}