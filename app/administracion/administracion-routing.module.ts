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
    RolComponent,
    LocalidadComponent,
    PeriodoComponent,
    SedeComponent,
    UsuarioComponent,
    AccionRolComponent,
    PresentismoComponent,
    ParametrosComponent
} from "../components";
import {AuthGuard} from "../guards/auth.guard";
import {AdministracionComponent} from "./components/administracion.component";
import {ComisionMaestroComponent} from "../components/comision/comision-maestro.component";
import {ComisionDetalleComponent} from "../components/comision/comision-detalle.component";
import {TipoRecursoComponent} from "../components/tipo-recurso/tipo-recurso.component";
import {RecursoComponent} from "../components/recurso/recurso.component";

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
/*
            {

                path: 'presentismo',
                component: PresentismoComponent
            },
            */
            {
                path: 'accion-rol',
                component: AccionRolComponent
            }, {
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
                path: 'comisiones',
                component: ComisionComponent,
                children: [
                    {
                        path: '',
                        component: ComisionMaestroComponent
                    }, {
                        path: 'detalle/:id',
                        component: ComisionDetalleComponent
                    }
                ]
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
                component: RolComponent
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
            },{
                path: 'parametros',
                component: ParametrosComponent
            },{
                path: 'tipos-recursos',
                component: TipoRecursoComponent
            },
            {
                path: 'recursos',
                component: RecursoComponent
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
