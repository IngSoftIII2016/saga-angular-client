import {NgModule}      from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {routing} from "./app.routing";
import { LOCALE_ID } from '@angular/core';

//import { MaterialModule } from '@angular/material';
import {InputTextModule,DataTableModule,ButtonModule,DialogModule, DropdownModule, ScheduleModule} from 'primeng/primeng';

import {CarCrudComponent}  from './car-crud.component';
import {CarService} from './cars/carservice';
import {AulasInMemoryDbService} from "./_services/aula-in-memory-db-service";
import {AppComponent} from "./app.component";
import {ClasesComponent} from "./clases.component";
import {GrupoComponent} from "./grupo/index";
import {GrupoService} from './_services/grupo.service';
import {LoginComponent} from "./_login/index";
import {AuthenticationService} from './_services/authentication.service';
import {AuthGuard} from './_guards/index';
import {NotFoundComponent} from "./notfound.component";
import {DocenteComponent} from "./docente/index";
import {SedeComponent} from "./sede/index";
//import {PeriodoComponent} from "./periodo/index";
//import {CarreraComponent} from "./carrera/index";




import {TimelineDaySchedule} from "./timeline-day-schedule.component";


@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing,
//      MaterialModule.forRoot(),
      InputTextModule,
      DataTableModule,
      ButtonModule,
      DialogModule,
      DropdownModule,
      ScheduleModule,
      InMemoryWebApiModule.forRoot(AulasInMemoryDbService, {
          passThruUnknownUrl: true
      }),
  ],
  declarations: [
      AppComponent,
      CarCrudComponent,
      ClasesComponent,
	  GrupoComponent,
	  NotFoundComponent,
	  LoginComponent,
	  DocenteComponent,
	  SedeComponent
	  //CarreraComponent,
	  //PeriodoComponent


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
