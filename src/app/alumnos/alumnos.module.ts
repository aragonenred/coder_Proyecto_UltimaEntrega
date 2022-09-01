import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaComponent } from './componentes/alta/alta.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';

import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';

import { EditComponent } from './componentes/edit/edit.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PaisPipe } from './pipes/pais.pipe';



@NgModule({
  declarations: [
    AltaComponent,
    ListaComponent,
    AlumnosComponent,
    PaisPipe,
    NombreApellidoPipe,
    EditComponent

  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    MaterialModule,
    SharedModule

  ],
  providers:[

  ]
})
export class AlumnosModule { }
