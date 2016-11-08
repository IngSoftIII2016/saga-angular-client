import {Horario} from "./horario";
import {Aula} from "./aula";

export interface Clase {
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    horario: Horario;
    aula: Aula;
    comentario: string;
}