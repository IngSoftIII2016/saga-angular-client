import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";
import {JwtHelper} from "angular2-jwt";
import {Usuario} from "../entities/usuario";

@Injectable()
export class AuthenticationService {

    jwtHelper: JwtHelper = new JwtHelper();

    public usuario: Observable<Usuario>;
    public isInvitado: Observable<boolean>;
    private subjectUsuario = new BehaviorSubject<Usuario>(null);


    constructor(private http: Http) {
        this.usuario = this.subjectUsuario.asObservable();
        this.isInvitado = this.usuario.map(user => user ? user.isInvitado() : true);
        this.getUsuario().subscribe(res => res);
    }

    /**
     * Retorna el usuario autenticado en el sistema en caso de existir. En caso contrario se autentica como invitado y
     * luego returna el usuario invitado.
     * @returns {any}
     */
    getUsuario(): Observable<Usuario> {
        let token = this.getToken();
        if (token) {
            return Observable.of(this.tokenToUser(token)).do(user => this.subjectUsuario.next(user));
        } else {
            return this.signInVitado();
        }
    }

    login(email, password): Observable<Usuario> {
        let self = this;
        return this.http.post(
            'http://localhost/saga/api/AuthEndpoint/login',
            {'data': {'email': email, 'password': password}})
            .timeout(6000)
            .map(res => res.json().body.token)
            .do(token => localStorage.setItem('token', token))
            .map(token => self.tokenToUser(token))
            .do(user => self.subjectUsuario.next(user));
    }

    logout(): Observable<Usuario> {
        return this.signInVitado();
    }
    change(email,oldpass , newpass): Observable<boolean> {
        return this.http.post('http://localhost/saga/api/AuthEndpoint/change_pass', ({'data':{ 'email': email,
            'oldpassword' : oldpass, 'newpassword' : newpass}}))
            .map((response: Response) => {
                return true;
            });
    }
   reset(email): Observable<boolean> {
       return this.http.post('http://localhost/saga/api/AuthEndpoint/reset_pass', ({'data':{ 'email': email}}))
           .map((response: Response) => {
               return true;
           });
   }
    getToken(): string {
        return localStorage.getItem('token');
    }

    refreshToken(): void {
        // TODO: Hacer bien el proceso de refresh token. Devuelve un Observable de usuario
        localStorage.removeItem('token');
    }

    private signInVitado(): Observable<Usuario> {
        return this.login('invitado', 'invitado');
    }

    private tokenToUser(token: string): Usuario {
        return new Usuario(this.jwtHelper.decodeToken(token).data);
    }
}