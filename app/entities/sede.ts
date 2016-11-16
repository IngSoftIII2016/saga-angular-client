export class Sede {
    id : number = null;
    nombre : string = '';

    constructor(value : Object = {}) {
        Object.assign(this, value);
    }
}
