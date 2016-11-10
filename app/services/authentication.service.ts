import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var Authorization = JSON.parse(localStorage.getItem('Authorization'));
        this.token = Authorization && Authorization.token;
    }

    login(username, password): Observable<boolean> {
        return this.http.post('http://localhost/saga/api/UsuarioEndpoint/login', ({'data':{ 'usuario': username,'contraseña':password }}))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().body.token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('Authorization', JSON.stringify( token ));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('Authorization');
    }
}