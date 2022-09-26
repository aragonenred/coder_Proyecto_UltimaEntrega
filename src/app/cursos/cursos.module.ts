import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursosListaComponent } from './componentes/cursos-lista/cursos-lista.component';
import { CursosEditComponent } from './componentes/cursos-edit/cursos-edit.component';
import { CursosAltaComponent } from './componentes/cursos-alta/cursos-alta.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { StoreModule } from '@ngrx/store';
import * as fromCursos from './state/cursos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './state/cursos.effects';


@NgModule({
  declarations: [
    CursosComponent,
    CursosListaComponent,
    CursosEditComponent,
    CursosAltaComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    MaterialModule,
    StoreModule.forFeature(fromCursos.cursosFeatureKey, fromCursos.reducer),
    EffectsModule.forFeature([CursosEffects])
  ]
})
export class CursosModule { }
