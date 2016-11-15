import {Localidad} from "./localidad";
export class Edificio {
    id: number;
    nombre: string;
    localidad: Localidad = null;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    setLocalidad(localidad: Localidad): void {
        this.localidad = localidad;
    }
}