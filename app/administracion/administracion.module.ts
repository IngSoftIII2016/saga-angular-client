///<reference path="../services/asignatura.service.d.ts"/>
/**
 * Created by juan on 04/01/17.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

import {HttpModule} from "@angular/http";
import {PasswordModule} from "primeng/components/password/password";
import {RadioButtonModule} from "primeng/components/radiobutton/radiobutton";
import {MessagesModule} from "primeng/components/messages/messages";
import {ConfirmDialogModule} from "primeng/components/confirmdialog/confirmdialog";
import {PaginatorModule} from "primeng/components/paginator/paginator";
import {GrowlModule} from "primeng/components/growl/growl";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {ScheduleModule} from "primeng/components/schedule/schedule";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {DialogModule} from "primeng/components/dialog/dialog";
import {ButtonModule} from "primeng/components/button/button";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {AsignaturaService} from "../services/asignatura.service";
import {AsignaturaCarreraService} from "../services/asignatura-carrera.service";
import {AulaService} from "../services/aula.service";
import {CarreraService} from "../services/carrera.service";
import {ClaseService} from "../services/clase.service";
import {ComisionService} from "../services/comision.service";
import {DocenteService} from "../services/docente.service";
import {EdificioService} from "../services/edificio.service";
import {EventoService} from "../services/evento.service";
import {GrupoService} from "../services/grupo.service";
import {HorarioService} from "../services/horario.service";
import {LocalidadService} from "../services/localidad.service";
import {PeriodoService} from "../services/periodo.service";
import {SedeService} from "../services/sede.service";
import {ConfirmationService} from "primeng/components/common/api";
import {UsuarioService} from "../services/usuario.service";
import {UsuarioGrupoService} from "../services/usuario-grupo.service";
import {TimelineDaySchedule} from "../components/grilla/timeline-day-schedule.component";
import {AdministracionComponent} from "./components/administracion.component";
import {AdministracionRoutingModule} from "./administracion-routing.module";

@NgModule({
    imports: [
        AdministracionRoutingModule,
        CommonModule,
        FormsModule,
        HttpModule,
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
    ],
    declarations: [
        AdministracionComponent,
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
        TimelineDaySchedule,
        UsuarioComponent,
        UsuarioGrupoComponent
    ],
    providers: [
        AsignaturaService,
        AsignaturaCarreraService,
        AulaService,
        CarreraService,
        ClaseService,
        ConfirmationService,
        ComisionService,
        DocenteService,
        EdificioService,
        EventoService,
        GrupoService,
        HorarioService,
        LocalidadService,
        PeriodoService,
        SedeService,
        UsuarioGrupoService,
        UsuarioService,
    ]
})
export class AdministracionModule {}