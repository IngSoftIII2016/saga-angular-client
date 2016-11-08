import {Comision} from "./comision";
import {Aula} from "./aula";

export interface Horario {
    id: number;
    dia: number;
    hora_inicio: number;
    duracion: number;
    descripcion: string;
    comision: Comision;
    aula: Aula;
}