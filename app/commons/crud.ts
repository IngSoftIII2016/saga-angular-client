/**
 * Created by juan on 03/12/16.
 */
import {OnInit} from "@angular/core";
import {Entity} from "./entity";
import {GenericStore} from "./generic.store";
import {GenericService} from "./generic.service";
import {Subject} from "rxjs";
import {Asignatura} from "../entities/asignatura";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {PreActivation} from "@angular/router/src/router";

export abstract class CRUD<E extends Entity, SV extends GenericService<E>, ST extends GenericStore<E, SV>> implements OnInit {

    protected entity: E;

    protected store: ST;

    protected displayDialog: boolean;

    protected isNew: boolean;

    protected msgs: Message[] = [];

    protected validaciones: Message[] = [];

    protected searchTerms = new Subject<string>();

    protected confirmCreate = true;

    protected confirmUpdate = true;

    protected confirmDelete = true;

    protected confirmService: ConfirmationService = null;

    // primitivas

    protected abstract getDefaultNewEntity(): E;

    protected abstract getEntityFromEvent(event: any): E;

    protected abstract getEntityReferencedLabel(): string;

    protected abstract getSearchFields(): string[];

    protected onSelect(entity: E): void {
    };

    protected validate(entity: E): Message[] {
        return [];
    };

    protected onBeforeCreate(): boolean {
        return true
    };

    protected onBeforeUpdate(): boolean {
        return true
    };

    protected onBeforeDelete(): boolean {
        return true
    };

    protected onCreate(entity: E): E {
        return entity
    };

    protected onUpdate(entity: E): E {
        return entity
    };

    protected onDelete(entity: E): E {
        return entity
    };

    protected onAfterCreate(entity: E): void {
    };

    protected onAfterUpdate(entity: E): void {
    };

    protected onAfterDelete(entity: E): void {
    };

    constructor(store: ST, confirmService: ConfirmationService = null) {
        this.store = store;
        this.entity = null;
        this.confirmService = confirmService;
        this.displayDialog = false;
        this.isNew = false;
    }

    ngOnInit() {
        console.log("parent called");

        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(terms => {
                let likes = {};
                if (terms.length > 0) {
                    let fields = this.getSearchFields();
                    for (let i in fields)
                        likes[fields[i]] = '*' + terms + '*';
                }
                this.store.setLikes(likes)
            })
    }

    showDialogToAdd() {
        this.isNew = true;
        this.entity = this.getDefaultNewEntity();
        this.openDialog();
    }

    onRowSelect(event): void {
        this.isNew = false;
        this.entity = this.getEntityFromEvent(event);
        this.onSelect(this.entity);
        this.openDialog();
    }

    protected openDialog() {
        this.validaciones = [];
        this.displayDialog = true;
    }

    save() {
        this.validaciones = this.validate(this.entity);
        if (this.validaciones && this.validaciones.length > 0) return;
        if (this.isNew) this.create();
        else this.update();
    }

    create() {
        if (!this.onBeforeCreate()) return;
        this.confimCreate()
            .then(() => {
                    this.entity = this.onCreate(this.entity);
                    this.store.create(this.entity)
                        .subscribe(creada => {
                                this.entity = creada;
                                this.displayDialog = false;
                                this.showOkCreateMessage();
                            }, this.showFailCreateMessage
                        )
                }
            )
    }

    update() {
        if (!this.onBeforeUpdate()) return;
        this.confimUpdate().then(() => {
            this.entity = this.onUpdate(this.entity);
            this.store.update(this.entity)
                .subscribe(
                    guardada => {
                        this.entity = guardada;
                        this.displayDialog = false;
                        this.showOkUpdateMessage()
                    }, this.showFailUpdateMessage);
        });
    }


    delete(): void {
        if (!this.onBeforeDelete()) return;
        this.confimDelete().then(() => {
            this.entity = this.onDelete(this.entity);
            this.store.delete(this.entity).subscribe(
                borrada => {
                    this.entity = borrada;
                    this.displayDialog = false;
                    this.showOkDeleteMessage()
                }, this.showFailDeleteMessage
            );
        });
    }


    pageChange(event) {
        let qo = {
            size: event.rows,
            page: event.page + 1
        };
        this.store.mergeQueryOptions(qo);
    }

    sort(event) {
        this.store.setSorts([event]);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    confimCreate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.confirmCreate && this.confirmService) {
                this.confirmService.confirm({
                    message: '¿está seguro que desea agregar ' + this.getEntityReferencedLabel() + '?',
                    header: 'Confirme',
                    icon: 'fa ui-icon-warning',
                    accept: () => resolve(true),
                    reject: reject
                });
            } else resolve(true);
        })
    }

    confimUpdate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.confirmUpdate && this.confirmService) {
                this.confirmService.confirm({
                    message: '¿está seguro que desea modificar ' + this.getEntityReferencedLabel() + '?',
                    header: 'Confirme',
                    icon: 'fa ui-icon-warning',
                    accept: () => resolve(true),
                    reject: reject
                });
            } else resolve(true);
        })

    }

    confimDelete(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.confirmDelete && this.confirmService) {
                this.confirmService.confirm({
                    message: '¿está seguro que desea eliminar ' + this.getEntityReferencedLabel() + '?',
                    header: 'Confirme',
                    icon: 'fa ui-icon-warning',
                    accept: resolve,
                    reject: reject
                });
            } else resolve(true);
        })
    }

    protected showOkCreateMessage() {
        this.msgs.push(
            {
                severity: 'success',
                summary: 'Creada',
                detail: 'Se ha agregado ' + this.getEntityReferencedLabel() + ' con exito!'
            });
    }

    protected showFailCreateMessage(error) {
        let err = error.json().error;
        this.msgs.push(
            {
                severity: 'error',
                summary: err.title,
                detail: 'No se ha podido agregar ' + this.getEntityReferencedLabel() + ' debido a: ' + err.detail
            });
    }

    protected showOkUpdateMessage() {
        this.msgs.push(
            {
                severity: 'success',
                summary: 'Guardada',
                detail: 'Se modificado ' + this.getEntityReferencedLabel() + ' con exito!'
            })
    }

    protected showFailUpdateMessage(error) {
        let err = error.json().error;
        this.msgs.push(
            {
                severity: 'error',
                summary: err.title,
                detail: 'No se ha podido modificar ' + this.getEntityReferencedLabel() + ' debido a: ' + err.detail
            })
    }

    protected showOkDeleteMessage() {
        this.msgs.push(
            {
                severity: 'success',
                summary: 'Exito',
                detail: 'Se ha eleminado ' + this.getEntityReferencedLabel() + ' con exito!'
            })
    }

    protected showFailDeleteMessage(error) {
        let err = error.json().error;
        this.msgs.push(
            {
                severity: 'error',
                summary: err.title,
                detail: 'No se ha podido eliminar ' + this.getEntityReferencedLabel() + ' debido a: ' + err.detail
            });
    }


}