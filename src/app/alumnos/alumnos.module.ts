import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaComponent } from './componentes/alta/alta.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { EdadPipe } from './pipes/edad.pipe';
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { PaisPipe } from './pipes/pais.pipe';
import { EditComponent } from './componentes/edit/edit.component';
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [
    AltaComponent,
    ListaComponent,
    AlumnosComponent,
    EdadPipe,
    NombreApellidoPipe,
    PaisPipe,
    EditComponent

  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    MaterialModule

  ],
  providers:[

  ]
})
export class AlumnosModule { }
