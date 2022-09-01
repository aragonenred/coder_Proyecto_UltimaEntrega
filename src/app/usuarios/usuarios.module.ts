import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosAltaComponent } from './componentes/usuarios-alta/usuarios-alta.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [
    UsuariosAltaComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule
  ]
})
export class UsuariosModule { }
