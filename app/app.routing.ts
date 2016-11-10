import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClasesComponent} from "./clases.component";
import {CarCrudComponent} from "./car-crud.component";
import {GrupoComponent} from "./grupo/grupo.component";
import {LoginComponent} from "./login/login.component";
import { AuthGuard } from './guards/auth.guard';
import {NotFoundComponent} from "./notfound.component";
import {DocenteComponent} from "./docente/docente.component";
import {SedeComponent} from "./sede/sede.component";
import {PeriodoComponent} from "./periodo/periodo.component";
//import {CarreraComponent} from "./carrera/index";



const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'clases/1',
        pathMatch: 'full'
    }, {
        path: 'clases/:id',
        component: ClasesComponent , canActivate: [AuthGuard]
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
        path: 'login',
        component: LoginComponent 
    }
	,
	{
        path: '404',
        component: NotFoundComponent 
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);