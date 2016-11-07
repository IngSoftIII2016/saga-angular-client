import {Aula} from "./aula";
/**
 * Created by juan on 07/11/16.
 */

export interface Evento {
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    aula: Aula;
    motivo: string;
}