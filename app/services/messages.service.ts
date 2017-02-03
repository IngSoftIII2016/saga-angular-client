/**
 * Created by juan on 03/02/17.
 */

import {Injectable} from "@angular/core";
import {Message} from "primeng/components/common/api";
import {Observable, Subject} from "rxjs";
@Injectable()
export class MessagesService {

    messageStream: Observable<Message>;

    messageSub = new Subject<Message>();

    constructor() {
        this.messageStream = this.messageSub.asObservable().share();
    }

    showMessage(message: Message) {
        this.messageSub.next(message);
    }
}