import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { InscripcionesAltaComponent } from './componentes/inscripciones-alta/inscripciones-alta.component';
import { InscripcionesListaComponent } from './componentes/inscripciones-lista/inscripciones-lista.component';
import { BuscarCursosComponent } from './componentes/buscar-cursos/buscar-cursos.component';
import { BuscarAlumnosComponent } from './componentes/buscar-alumnos/buscar-alumnos.component';

@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionesAltaComponent,
    BuscarCursosComponent,
    InscripcionesListaComponent,
    BuscarAlumnosComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    MaterialModule
  ]
})
export class InscripcionesModule { }
