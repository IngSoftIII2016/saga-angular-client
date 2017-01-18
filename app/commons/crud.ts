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

    public entity: E;

    protected store: ST;

    protected displayDialog: boolean;

    protected isNew: boolean;

    public msgs: Message[] = [];

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

    constructor(store: ST, confirmService: ConfirmationService = null) {
        this.store = store;
        this.entity = null;
        this.confirmService = confirmService;
        this.displayDialog = false;
        this.isNew = false;
    }

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
        this.entity = this.getDefaultNewEntity();
    }

    filter(field, value) {
        let queryOptions = {filters : {} };
        queryOptions.filters[field] = value;
        this.store.mergeQueryOptions(queryOptions);
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
        this.confimCreate()
            .then(() => {
                self.entity = self.onCreate(self.entity);
                self.store.create(self.entity)
                        .subscribe(creada => {
                            self.entity = creada;
                            self.displayDialog = false;
                            self.showOkCreateMessage();
                            }, error => self.showFailCreateMessage(error)
                        )
                }
            )
    }

    update() {
        if (!this.onBeforeUpdate()) return;
        let self = this;
        this.confimUpdate().then(() => {
            self.entity = this.onUpdate(self.entity);
            self.store.update(self.entity)
                .subscribe(
                    guardada => {
                        self.entity = guardada;
                        self.displayDialog = false;
                        self.showOkUpdateMessage();
                    }, error => self.showFailUpdateMessage(error)
                );
        });
    }


    delete(): void {
        if (!this.onBeforeDelete()) return;
        let self = this;
        this.confimDelete().then(() => {
            self.entity = self.onDelete(self.entity);
            self.store.delete(self.entity).subscribe(
                borrada => {
                    self.entity = borrada;
                    self.displayDialog = false;
                    self.showOkDeleteMessage();
                }, error => self.showFailDeleteMessage(error)
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
        console.log(this);
        this.msgs.push(
            {
                severity: 'error',
                summary: err.title,
                detail: 'No se ha podido eliminar ' + this.getEntityReferencedLabel() + ' debido a: ' + err.detail
            });
    }


}