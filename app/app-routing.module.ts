/**
 * Created by juan on 04/01/17.
 */
import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { GrillaComponent } from "./components/grilla/grilla.component";
import { GrupoComponent } from "./components/grupo/grupo.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { DocenteComponent } from "./components/docente/docente.component";
import { SedeComponent } from "./components/sede/sede.component";
import { PeriodoComponent } from "./components/periodo/periodo.component";
import { EdificioComponent } from "./components/edificio/edificio.component";
import { AsignaturaComponent } from "./components/asignatura/asignatura.component";
import { LocalidadComponent } from "./components/localidad/localidad.component";
import { CarreraComponent } from "./components/carrera/index";
import { AulaComponent } from "./components/aula/aula.component";
import { EventoComponent } from "./components/evento/evento.component";
import { ClaseComponent } from "./components/clase/clase.component";
import { UsuarioComponent } from "./components/usuario/usuario.component";
import { ComisionComponent } from "./components/comision/comision.component";
import { AsignaturaCarreraComponent } from "./components/asignatura-carrera/asignatura-carrera.component";
import { UsuarioGrupoComponent } from "./components/usuario-grupo/usuario-grupo.component";
import { HorarioComponent } from "./components/horario/horario.component";
import { CompositeAsignaturaComponent } from "./components/composite-asignatura/composite-asignatura.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'grilla',
        pathMatch: 'full'
    },
    {
        path: 'asignaturas',
        component: AsignaturaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'composite-asignaturas',
        component: CompositeAsignaturaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'asignatura-carrera',
        component: AsignaturaCarreraComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'aulas',
        component: AulaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'carreras',
        component: CarreraComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clases',
        component: ClaseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'comision',
        component: ComisionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'docentes',
        component: DocenteComponent ,
        canActivate: [AuthGuard]
    },
    {
        path: 'edificios',
        component: EdificioComponent ,
        canActivate: [AuthGuard]
    },
    {
        path: 'eventos',
        component: EventoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'grilla',
        component: GrillaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'roles',
        component: GrupoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'localidades',
        component: LocalidadComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'horarios',
        component: HorarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'periodos',
        component: PeriodoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'usuarios',
        component: UsuarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sedes',
        component: SedeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'usuario-rol',
        component: UsuarioGrupoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
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