import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClasesComponent} from "./clases.component";
import {CarCrudComponent} from "./car-crud.component";
import {GrupoComponent} from "./grupo/index";
import {LoginComponent} from "./_login/index";
import { AuthGuard } from './_guards/index';
import {NotFoundComponent} from "./notfound.component";
import {DocenteComponent} from "./docente/index";
import {SedeComponent} from "./sede/index";
import {PeriodoComponent} from "./periodo/index";
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