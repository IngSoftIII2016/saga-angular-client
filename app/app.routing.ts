import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CarCrudComponent} from "./car-crud.component";
import {GrupoComponent} from "./components/grupo/grupo.component";
import {LoginComponent} from "./components/login/login.component";
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import {NotFoundComponent} from "./notfound.component";
import {DocenteComponent} from "./components/docente/docente.component";
import {SedeComponent} from "./components/sede/sede.component";
import {PeriodoComponent} from "./components/periodo/periodo.component";
import {EdificioComponent} from "./components/edificio/edificio.component";
import {AsignaturaComponent} from "./components/asignatura/asignatura.component";
import {LocalidadComponent} from "./components/localidad/localidad.component";
import {CarreraComponent} from "./components/carrera/index";
import {AulaComponent} from "./components/aula/aula.component";
import {EventoComponent} from "./components/evento/evento.component";
import {GrillaComponent} from "./grilla.component";



const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'grilla/1',
        pathMatch: 'full'
    }, {
        path: 'grilla/:id',
        component: GrillaComponent, canActivate: [AuthGuard]
    }, {
        path: 'cars',
        component: CarCrudComponent , canActivate: [AuthGuard]
    }
	, {
        path: 'grupos',
        component: GrupoComponent , canActivate: [AuthGuard]
    }
	, {
        path: 'docentes',
        component: DocenteComponent , canActivate: [AuthGuard]
    }
	, {
        path: 'sedes',
        component: SedeComponent , canActivate: [AuthGuard]
    }
    , {
        path: 'periodos',
        component: PeriodoComponent , canActivate: [AuthGuard]
    }
    , {
        path: 'edificios',
        component: EdificioComponent , canActivate: [AuthGuard]
    }
    , {
        path: 'asignaturas',
        component: AsignaturaComponent, canActivate: [AuthGuard]
    }
    , {
        path: 'carreras',
        component: CarreraComponent, canActivate: [AuthGuard]
    }
    , {
        path: 'localidades',
        component: LocalidadComponent, canActivate: [AuthGuard]
    }
	, {
        path: 'login',
        component: LoginComponent , canActivate: [LoginGuard]
    }
    , {
        path: 'aulas',
        component: AulaComponent, canActivate: [AuthGuard]
    }
    , {
        path: 'eventos',
        component: EventoComponent, canActivate: [AuthGuard]
    }
	,

    {path: '404', component: NotFoundComponent},

    {path: '**', redirectTo: '404'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);