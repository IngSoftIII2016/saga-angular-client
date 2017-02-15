import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import 'hammerjs';


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
    MessagesModule,
    RadioButtonModule,
    PasswordModule
} from 'primeng/primeng';

import { AppComponent } from "./components/app.component";

import {
    LoginComponent,
    NotFoundComponent,
} from "./components";

import {AuthenticationService} from "./services/authentication.service";

import {AppRoutingModule} from "./app-routing.module";
import {AdministracionModule} from "./administracion/administracion.module";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
      AdministracionModule,
      BrowserModule,
      FormsModule,
      HttpModule,
      AppRoutingModule,
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
      MessagesModule,
      RadioButtonModule,
      PasswordModule,
      MaterialModule.forRoot(),

  ],
  declarations: [
      AppComponent,
      LoginComponent,
      NotFoundComponent
  ],
  bootstrap: [AppComponent],
  providers: [
	  AuthenticationService,
      { provide: LOCALE_ID, useValue: "es" },
      AUTH_PROVIDERS
  ]
})
export class AppModule { }
