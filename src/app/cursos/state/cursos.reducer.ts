import { Action, createReducer, on } from '@ngrx/store';
import * as CursosActions from './cursos.actions';
import { Cursos } from '../../models/cursos';

export const cursosFeatureKey = 'cursos';

export interface CursoState {
  cargando: boolean;
  cursos?: Cursos[]
}

export const initialState: CursoState = {
  cargando: false
};

export const reducer = createReducer(
  initialState,
  on(CursosActions.cargarCursos, (state) => {

    return {...state, cargando:true}
    }),
  on(CursosActions.cursosCargados, (state, { cursos }) => {
    return { ...state, cargando: false, cursos: cursos};
  })

);
