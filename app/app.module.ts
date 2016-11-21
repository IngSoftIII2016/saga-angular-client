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
    ConfirmationService
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
    ClaseComponent
} from "./components";

import {GrupoService} from './services/grupo.service';
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from "./guards/login.guard";
import {AuthenticationService} from "./services/authentication.service";

import {TimelineDaySchedule} from "./components/timeline-day-schedule.component";
import {SedeService} from "./services/sede.service";
import {AulaService} from "./services/aula.service";



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
      EventoComponent,
      ClaseComponent

  ],
  bootstrap: [AppComponent],
  providers: [
      AuthGuard,
	  LoginGuard,
	  AuthenticationService,
      AulaService,
      SedeService,
      ConfirmationService
      { provide: LOCALE_ID, useValue: "es" }
  ]
})
export class AppModule { }
