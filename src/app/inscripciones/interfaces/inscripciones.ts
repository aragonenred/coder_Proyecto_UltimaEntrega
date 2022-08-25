import { Alumnos } from '../../alumnos/interfaces/alumnos';
import { Cursos } from '../../cursos/interfaces/cursos';
export interface Inscripciones {
  alumno:string;
  dni:string;
  cursos: Cursos[];
}
