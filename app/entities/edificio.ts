import {Localidad} from "./localidad";
import {Entity} from "../commons/entity";
export class Edificio implements Entity{
    id: number = null;
    nombre: string;
    localidad: Localidad = new Localidad();

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}