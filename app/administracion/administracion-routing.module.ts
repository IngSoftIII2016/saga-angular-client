/**
 * Created by juan on 05/01/17.
 */
import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import {
    AsignaturaComponent,
    AsignaturaCarreraComponent,
    AulaComponent,
    CarreraComponent,
    ClaseComponent,
    ComisionComponent,
    DocenteComponent,
    EdificioComponent,
    EventoComponent,
    HorarioComponent,
    GrillaComponent,
    GrupoComponent,
    LocalidadComponent,
    PeriodoComponent,
    SedeComponent,
    UsuarioComponent,
    UsuarioGrupoComponent
} from "../components";
import {AuthGuard} from "../guards/auth.guard";

const adminRoutes: Routes = [
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
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdministracionModule {}