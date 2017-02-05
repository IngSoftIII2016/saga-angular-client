/**
 * Created by juan on 03/12/16.
 */
import {OnInit} from "@angular/core";
import {Entity} from "./entity";
import {GenericStore} from "./generic.store";
import {GenericService} from "./generic.service";
import {Subject} from "rxjs";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {MessagesService} from "../services/messages.service";

export abstract class CRUD<E extends Entity, SV extends GenericService<E>, ST extends GenericStore<E, SV>> implements OnInit {

    public entity: E;

    protected store: ST;

    protected displayDialog: boolean;

    protected isNew: boolean;

    msgs: Message[] = [];

    protected validaciones: Message[] = [];

    protected searchTerms = new Subject<string>();

    protected confirmCreate = true;

    protected confirmUpdate = true;

    protected confirmDelete = true;

    protected messagesService: MessagesService;

    protected confirmService: ConfirmationService = null;

    constructor(store: ST, messagesService: MessagesService, confirmService: ConfirmationService = null) {
        this.store = store;
        this.entity = null;
        this.messagesService = messagesService;
        this.confirmService = confirmService;
        this.displayDialog = false;
        this.isNew = false;
    }

    // primitivas

    protected abstract getDefaultNewEntity(): E;

    protected abstract getEntityFromEvent(event: any): E;

    protected abstract getEntityReferencedLabel(entity: E): string;

    protected abstract getSearchFields(): string[];

    protected onSelect(entity: E): void {
    };

    protected validate(entity: E): Message[] {
        return [];
    };

    protected onOpenDialog(entity): void {
    }

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
        return this.onSave(entity);
    };

    protected onUpdate(entity: E): E {
        return this.onSave(entity);
    };

    protected onSave(entity: E): E {
        return entity;
    }

    protected onDelete(entity: E): E {
        return entity
    };

    protected onAfterCreate(entity: E): void {
    };

    protected onAfterUpdate(entity: E): void {
    };

    protected onAfterDelete(entity: E): void {
    };

    ngOnInit() {
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

    protected openDialog(){
        this.onOpenDialog(this.entity);
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
        let self = this;
        this.confimCreate(this.entity)
            .then(() => {
                self.entity = self.onCreate(self.entity);
                self.store.create(self.entity)
                        .subscribe(creada => {
                            self.entity = creada as E;
                            self.displayDialog = false;
                            self.onAfterCreate(self.entity);
                            self.showOkCreateMessage(self.entity);
                            }, error => self.showFailCreateMessage(self.entity, error)
                        )
                }
            )
    }

    update() {
        if (!this.onBeforeUpdate()) return;
        let self = this;
        this.confimUpdate(this.entity).then(() => {
            self.entity = this.onUpdate(self.entity);
            self.store.update(self.entity)
                .subscribe(
                    guardada => {
                        self.entity = guardada as E;
                        self.displayDialog = false;
                        self.onAfterUpdate(self.entity);
                        self.showOkUpdateMessage(self.entity);
                    }, error => self.showFailUpdateMessage(self.entity, error)
                );
        });
    }


    delete(): void {
        if (!this.onBeforeDelete()) return;
        let self = this;
        this.confimDelete(this.entity).then(() => {
            self.entity = self.onDelete(self.entity);
            self.store.delete(self.entity).subscribe(
                borrada => {
                    self.entity = borrada as E;
                    self.displayDialog = false;
                    self.onAfterDelete(self.entity);
                    self.showOkDeleteMessage(self.entity);
                }, error => self.showFailDeleteMessage(self.entity, error)
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


    filter(field, value) {
        if(!value) this.store.removeFilter(field);
        else this.store.setFilter(field, value);
    }

    sort(event) {
        this.store.setSorts([event]);
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    confimCreate(entity: E): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.confirmCreate && this.confirmService) {
                this.confirmService.confirm({
                    message: '¿está seguro que desea agregar ' + this.getEntityReferencedLabel(entity) + '?',
                    header: 'Confirme',
                    icon: 'fa ui-icon-warning',
                    accept: () => resolve(true),
                    reject: null
                });
            } else resolve(true);
        })
    }

    confimUpdate(entity: E): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.confirmUpdate && this.confirmService) {
                this.confirmService.confirm({
                    message: '¿está seguro que desea modificar ' + this.getEntityReferencedLabel(entity) + '?',
                    header: 'Confirme',
                    icon: 'fa ui-icon-warning',
                    accept: () => resolve(true),
                    reject: null
                });
            } else resolve(true);
        })

    }

    confimDelete(entity: E): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.confirmDelete && this.confirmService) {
                this.confirmService.confirm({
                    message: '¿está seguro que desea eliminar ' + this.getEntityReferencedLabel(entity) + '?',
                    header: 'Confirme',
                    icon: 'fa ui-icon-warning',
                    accept: () => resolve(true),
                    reject: null
                });
            } else resolve(true);
        })
    }

    protected showOkCreateMessage(entity: E) {
        this.messagesService.showMessage({
            severity: 'success',
            summary: 'Creada',
            detail: 'Se ha agregado ' + this.getEntityReferencedLabel(entity) + ' con exito!'
        });
    }

    protected showFailCreateMessage(entity: E, error: any) {
        let err = error.json().error;
        this.messagesService.showMessage({
                severity: 'error',
                summary: err.title,
                detail: 'No se ha podido agregar ' + this.getEntityReferencedLabel(entity) + ' debido a: ' + err.detail
            });
    }

    protected showOkUpdateMessage(entity: E) {
        this.messagesService.showMessage(
            {
                severity: 'success',
                summary: 'Guardado',
                detail: 'Se ha modificado ' + this.getEntityReferencedLabel(entity) + ' con exito!'
            })
    }

    protected showFailUpdateMessage(entity: E, error: any) {
        let err = error.json().error;
        this.messagesService.showMessage({
                severity: 'error',
                summary: err.title,
                detail: 'No se ha podido modificar ' + this.getEntityReferencedLabel(entity) + ' debido a: ' + err.detail
            })
    }

    protected showOkDeleteMessage(entity: E) {
        this.messagesService.showMessage({
                severity: 'success',
                summary: 'Borrado',
                detail: 'Se ha eleminado ' + this.getEntityReferencedLabel(entity) + ' con exito!'
            })
    }

    protected showFailDeleteMessage(entity: E, error) {
        let err = error.json().error;
        console.log(this);
        this.messagesService.showMessage({
                severity: 'error',
                summary: err.title,
                detail: 'No se ha podido eliminar ' + this.getEntityReferencedLabel(entity) + ' debido a: ' + err.detail
            });
    }
}