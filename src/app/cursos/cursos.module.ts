import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursosListaComponent } from './componentes/cursos-lista/cursos-lista.component';
import { CursosEditComponent } from './componentes/cursos-edit/cursos-edit.component';
import { CursosAltaComponent } from './componentes/cursos-alta/cursos-alta.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { MaterialModule } from '../shared/material/material.module';


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

  ]
})
export class CursosModule { }
