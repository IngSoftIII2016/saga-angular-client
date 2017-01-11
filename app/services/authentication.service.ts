﻿import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {

    }

    login(email, password): Observable<boolean> {
        return this.http.post('http://localhost/saga/api/UsuarioEndpoint/login', ({'data':{ 'usuario': email,'contraseña':password }}))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().body.token;

                if (token) {
                    // set token property
					let usuario = response.json().body.usuario;
					let nombre_apellido = response.json().body.nombre_apellido;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('Authorization', JSON.stringify( token ));
                    localStorage.setItem('Usuario', usuario);
					localStorage.setItem('Nombre_Apellido', nombre_apellido);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login 
                    return false; 
                }
            });
    }

   reset(email): Observable<boolean> {
       return this.http.post('http://localhost/saga/api/UsuarioEndpoint/reset_pass_post', ({'data':{ 'email': email}}))
           .map((response: Response) => {
               return true;
           });
   }
}