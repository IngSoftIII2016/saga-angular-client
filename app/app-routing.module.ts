/**
 * Created by juan on 04/01/17.
 */
import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { NotFoundComponent } from "./components/not-found/not-found.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'administracion/grilla',
        pathMatch: 'full'
    }, {
        path: 'login',
        component: LoginComponent
        //canActivate: [LoginGuard]
    }, {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    providers: [
        AuthGuard,
        LoginGuard
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}