import {NgModule}      from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from "./app.routing";
import { LOCALE_ID } from '@angular/core';



import {
    InputTextModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    ScheduleModule,
    CalendarModule,
    GrowlModule,
    PaginatorModule,
    ConfirmDialogModule,
    ConfirmationService,
    PickListModule
} from 'primeng/primeng';

import {AppComponent} from "./components/app.component";

import {
    GrillaComponent,
    GrupoComponent,
    LoginComponent,
    DocenteComponent,
    SedeComponent,
    PeriodoComponent,
    EdificioComponent,
    AsignaturaComponent,
    CarreraComponent,
    AulaComponent,
    EventoComponent,
    LocalidadComponent,
    NotFoundComponent,
    ClaseComponent,
    UsuarioComponent
} from "./components";

import {GrupoService} from './services/grupo.service';
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from "./guards/login.guard";
import {AuthenticationService} from "./services/authentication.service";

import {TimelineDaySchedule} from "./components/grilla/timeline-day-schedule.component";
import {SedeService} from "./services/sede.service";
import {AulaService} from "./services/aula.service";
import {CarreraService} from "./services/carrera.service";
import {DocenteService} from "./services/docente.service";
import {AsignaturaService} from "./services/asignatura.service";
import {ClaseService} from "./services/clase.service";
import {PeriodoService} from "./services/periodo.service";
import {LocalidadService} from "./services/localidad.service";
import {EventoService} from "./services/evento.service";
import {EdificioService} from "./services/edificio.service";
import {ComisionComponent} from "./components/comision/comision.component";
import {ComisionService} from "./services/comision.service";
import {AsignaturaCarreraService} from "./services/asignatura-carrera.service";
import {AsignaturaCarreraComponent} from "./components/asignatura-carrera/asignatura-carrera.component";
import {UsuarioService} from "./services/usuario.service";
import {UsuarioGrupoService} from "./services/usuario-grupo.service";
import {UsuarioGrupoComponent} from "./components/usuario-grupo/usuario-grupo.component";



@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing,
      InputTextModule,
      DataTableModule,
      ButtonModule,
      DialogModule,
      DropdownModule,
      ScheduleModule,
      CalendarModule,
      GrowlModule,
      PaginatorModule,
      ConfirmDialogModule
  ],
  declarations: [
      AppComponent,
      AsignaturaComponent,
      AsignaturaCarreraComponent,
      AulaComponent,
      CarreraComponent,
      ClaseComponent,
      ComisionComponent,
      DocenteComponent,
      EdificioComponent,
      EventoComponent,
      GrillaComponent,
      GrupoComponent,
      LocalidadComponent,
      LoginComponent,
      NotFoundComponent,
      PeriodoComponent,
      SedeComponent,
      UsuarioComponent,
      UsuarioGrupoComponent,
      TimelineDaySchedule

  ],
  bootstrap: [AppComponent],
  providers: [
      AuthGuard,
	  LoginGuard,
	  AuthenticationService,
      AsignaturaService,
      AsignaturaCarreraService,
      AulaService,
      SedeService,
      CarreraService,
      ClaseService,
      ComisionService,
      DocenteService,
      EdificioService,
      EventoService,
      GrupoService,
      LocalidadService,
      PeriodoService,
      SedeService,
      ConfirmationService,
      UsuarioService,
      UsuarioGrupoService,
      { provide: LOCALE_ID, useValue: "es" }
  ]
})
export class AppModule { }
