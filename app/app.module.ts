import {NgModule}      from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from "./app.routing";
import { LOCALE_ID } from '@angular/core';

import {InputTextModule,DataTableModule,ButtonModule,DialogModule, DropdownModule, ScheduleModule, CalendarModule} from 'primeng/primeng';

import {CarCrudComponent}  from './car-crud.component';
import {CarService} from './cars/carservice';

import {AppComponent} from "./app.component";
import {ClasesComponent} from "./clases.component";
import {GrupoComponent} from "./grupo/index";
import {GrupoService} from './services/grupo.service';
import {LoginComponent} from "./login/login.component";
import {AuthenticationService} from './services/authentication.service';
import {AuthGuard} from './guards/index';
import {NotFoundComponent} from "./notfound.component";
import {DocenteComponent} from "./docente/index";
import {SedeComponent} from "./sede/index";
import {PeriodoComponent} from "./periodo/index";
import {EdificioComponent} from "./edificio/index";
//import {CarreraComponent} from "./carrera/index";



import {TimelineDaySchedule} from "./timeline-day-schedule.component";


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
      CalendarModule
  ],
  declarations: [
      AppComponent,
      CarCrudComponent,
      ClasesComponent,
	  GrupoComponent,
	  NotFoundComponent,
	  LoginComponent,
	  DocenteComponent,
	  SedeComponent,
      TimelineDaySchedule,
	  //CarreraComponent,
	  PeriodoComponent,
      EdificioComponent


  ],
  bootstrap:    [AppComponent],
  providers:    [
      AuthGuard,
	 // GrupoService,
      CarService,
	  AuthenticationService,
      { provide: LOCALE_ID, useValue: "es" }
  ]
})
export class AppModule { }
