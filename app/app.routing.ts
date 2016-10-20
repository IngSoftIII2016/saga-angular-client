import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClasesComponent} from "./clases.component";
import {CarCrudComponent} from "./car-crud.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'clases/1',
        pathMatch: 'full'
    }, {
        path: 'clases/:id',
        component: ClasesComponent
    }, {
        path: 'cars',
        component: CarCrudComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);