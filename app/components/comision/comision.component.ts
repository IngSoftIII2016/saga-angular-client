import {Component} from '@angular/core';
import {ComisionStore} from "../../services/comision.store";

@Component({
    templateUrl: 'app/components/comision/comision.component.html',
    styleUrls: ['app/resources/demo/css/dialog.css'],
    selector: 'comision',
    providers: [ComisionStore]
})
export class ComisionComponent {

}
