import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";
import {JwtHelper} from "angular2-jwt";
import {Usuario} from "../entities/usuario";

@Injectable()
export class AuthenticationService {
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(private http: Http) {

    }

    login(email, password): Observable<boolean> {
        //return this.http.post('http://localhost/saga/api/AuthEndpoint/login', ({'data':{ 'usuario': email,'contraseña':password }}))
        return this.http.post('http://localhost/saga/api/AuthEndpoint/login', ({'data':{ 'email': email, 'password':password }}))
            .map((response: Response) => {
                let token = response.json().body.token;

                if (token) {

					let usuario = JSON.stringify(this.jwtHelper.decodeToken(token).data);

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('Authorization',  token);
                    localStorage.setItem('Usuario', usuario);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }


   reset(email): Observable<boolean> {
       return this.http.post('http://localhost/saga/api/AuthEndpoint/reset_pass', ({'data':{ 'email': email}}))
           .map((response: Response) => {
               return true;
           });
   }
}