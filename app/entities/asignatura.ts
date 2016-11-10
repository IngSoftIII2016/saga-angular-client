import {Carrera} from "./carrera";

export interface Asignatura {
    id: number;
    nombre: string;
    carreras: Carrera[];
}