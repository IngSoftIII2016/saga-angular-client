import {NgModule}      from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from "./app.routing";
import { LOCALE_ID } from '@angular/core';



import {InputTextModule,DataTableModule,ButtonModule,DialogModule, DropdownModule, ScheduleModule, CalendarModule, GrowlModule} from 'primeng/primeng';

import {AppComponent} from "./components/app.component";

import {GrillaComponent} from "./components/grilla/grilla.component";
import {GrupoComponent} from "./components/grupo/index";
import {GrupoService} from './services/grupo.service';
import {LoginComponent} from "./components/login/login.component";
import {AuthenticationService} from './services/authentication.service';
import {AuthGuard} from './guards/index';
import {LoginGuard} from './guards/login.guard';
import {NotFoundComponent} from "./notfound.component";
import {DocenteComponent} from "./components/docente/index";
import {SedeComponent} from "./components/sede/index";
import {PeriodoComponent} from "./components/periodo/index";
import {EdificioComponent} from "./components/edificio/index";
import {AsignaturaComponent} from "./components/asignatura/index"
import {CarreraComponent} from "./components/carrera/index";
import {AulaComponent} from "./components/aula/index";
import {EventoComponent} from "./components/evento/index";
import {LocalidadComponent} from "./components/localidad/localidad.component";
import {TimelineDaySchedule} from "./timeline-day-schedule.component";
import {SedeService} from "./services/sede.service";

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
      GrowlModule
  ],
  declarations: [
      AppComponent,
      GrillaComponent,
	  GrupoComponent,
	  NotFoundComponent,
	  LoginComponent,
	  DocenteComponent,
	  SedeComponent,
      TimelineDaySchedule,
	  CarreraComponent,
	  PeriodoComponent,
      LocalidadComponent,
      AsignaturaComponent,
      EdificioComponent,
      AulaComponent,
      EventoComponent

  ],
  bootstrap: [AppComponent],
  providers: [
      AuthGuard,
	  LoginGuard,
	  AuthenticationService,
      SedeService,
      { provide: LOCALE_ID, useValue: "es" }
  ]
})
export class AppModule { }
