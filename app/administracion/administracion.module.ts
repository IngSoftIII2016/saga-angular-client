///<reference path="../services/asignatura.service.d.ts"/>
/**
 * Created by juan on 04/01/17.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//noinspection TypeScriptCheckImport
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
    AccionRolComponent
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
import {RolService} from "../services/rol.service";
import {HorarioService} from "../services/horario.service";
import {LocalidadService} from "../services/localidad.service";
import {PeriodoService} from "../services/periodo.service";
import {SedeService} from "../services/sede.service";
import {ConfirmationService} from "primeng/components/common/api";
import {UsuarioService} from "../services/usuario.service";
import {AccionService} from "../services/accion.service";
import {AccionRolService} from "../services/accion-rol.service";
import {TimelineDaySchedule} from "../components/grilla/timeline-day-schedule.component";
import {AdministracionComponent} from "./components/administracion.component";
import {AdministracionRoutingModule} from "./administracion-routing.module";
import {MultiSelectModule} from "primeng/components/multiselect/multiselect";
import {TooltipModule} from "primeng/components/tooltip/tooltip";

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
        TooltipModule,
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
        RolComponent,
        LocalidadComponent,
        PeriodoComponent,
        SedeComponent,
        TimelineDaySchedule,
        UsuarioComponent,
        AccionRolComponent
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
        RolService,
        HorarioService,
        LocalidadService,
        PeriodoService,
        SedeService,
        UsuarioService,
        AccionService,
        RolService,
        AccionRolService
    ]
})
export class AdministracionModule {}