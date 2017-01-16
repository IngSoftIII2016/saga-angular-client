/**
 * Created by juan on 05/01/17.
 */
import {NgModule}              from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';

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
import {AdministracionComponent} from "./components/administracion.component";

const adminRoutes: Routes = [
    {
        path: '',
        redirectTo: 'administracion/grilla',
        pathMatch: 'full'
    },
    {
        path: 'administracion',
        component: AdministracionComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'asignaturas',
                component: AsignaturaComponent
            }, {
                path: 'asignatura-carrera',
                component: AsignaturaCarreraComponent
            }, {
                path: 'aulas',
                component: AulaComponent
            }, {
                path: 'carreras',
                component: CarreraComponent
            }, {
                path: 'clases',
                component: ClaseComponent
            }, {
                path: 'comision',
                component: ComisionComponent
            }, {
                path: 'docentes',
                component: DocenteComponent
            }, {
                path: 'edificios',
                component: EdificioComponent
            }, {
                path: 'eventos',
                component: EventoComponent
            }, {
                path: 'grilla',
                component: GrillaComponent
            }, {
                path: 'roles',
                component: GrupoComponent
            }, {
                path: 'localidades',
                component: LocalidadComponent
            }, {
                path: 'horarios',
                component: HorarioComponent
            }, {
                path: 'periodos',
                component: PeriodoComponent
            }, {
                path: 'usuarios',
                component: UsuarioComponent
            }, {
                path: 'sedes',
                component: SedeComponent
            }, {
                path: 'usuario-rol',
                component: UsuarioGrupoComponent
            }
        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdministracionRoutingModule {
}