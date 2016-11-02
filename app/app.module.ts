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
import {AulasInMemoryDbService} from "./services/aula-in-memory-db-service";
import {AppComponent} from "./app.component";
import {ClasesComponent} from "./clases.component";


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
      ClasesComponent
  ],
  bootstrap:    [AppComponent],
  providers:    [
      CarService,
      { provide: LOCALE_ID, useValue: "es" }
  ]
})
export class AppModule { }
