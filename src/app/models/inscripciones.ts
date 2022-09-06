import { Alumnos } from './alumnos';
import { Cursos } from './cursos';
export interface Inscripciones {
  id?:string;
  alumno: string;
  dni: string;
  cursoid?: string;
  curso: string;
  duracion: string;
  profesor: string
}
