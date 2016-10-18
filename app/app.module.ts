import {NgModule}      from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {CarCrudComponent}  from './car-crud.component';
import {CarService} from './cars/carservice';
import {InputTextModule,DataTableModule,ButtonModule,DialogModule, DropdownModule} from 'primeng/primeng';
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
//import {ClaseInMemoryDbService} from "./services/clase-in-memory-db-service";
import {AulasInMemoryDbService} from "./services/aula-in-memory-db-service";
//import {EdificioInMemoryDbService} from "./services/edificio-in-memory-db-service";
import {AppComponent} from "./app.component";
import {ClasesComponent} from "./clases.component";

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      InputTextModule,
      DataTableModule,
      ButtonModule,
      DialogModule,
      DropdownModule,
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
  providers:    [CarService]
})
export class AppModule { }
