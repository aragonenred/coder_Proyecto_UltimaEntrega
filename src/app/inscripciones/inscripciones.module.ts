import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { InscripcionesAltaComponent } from './componentes/inscripciones-alta/inscripciones-alta.component';




@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionesAltaComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    MaterialModule
  ]
})
export class InscripcionesModule { }
