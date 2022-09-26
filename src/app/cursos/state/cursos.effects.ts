import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from 'rxjs';
import { CursosService } from '../services/cursos.service';
import { Cursos } from '../../models/cursos';

@Injectable()


export class CursosEffects {

  cargarCursos$ = createEffect(()=> this.actions$.pipe(
    ofType('[Cursos] Cargar Cursos'),
    mergeMap(()=> this.cursosService.obtenerCursos().pipe(
      map((c: Cursos[]) => ({type: '[Cursos] Cursos Cargados', cursos: c }))
    ))
  ));

  constructor(
    private actions$: Actions,
    private cursosService: CursosService
  ){

  }



}
