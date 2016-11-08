import {Edificio} from "./edificio";
export interface Aula {
    id: number;
    nombre: string;
    capacidad: number;
    ubicacion: number;
    edificio: Edificio;
}