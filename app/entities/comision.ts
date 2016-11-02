import {Asignatura} from "./asignatura";
import {Docente} from "./docente";

export interface Comision {
    id: number;
    nombre: string;
    asignatura: Asignatura;
    docente: Docente[];

}