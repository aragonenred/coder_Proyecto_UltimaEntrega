import { createAction, props } from '@ngrx/store';
import { Cursos } from '../../models/cursos';

export const cargarCursos = createAction(
  '[Cursos] Cargar Cursos'
);

export const cursosCargados = createAction(
  '[Cursos] Cursos Cargados',
   props<{cursos:Cursos[]}>()
);




