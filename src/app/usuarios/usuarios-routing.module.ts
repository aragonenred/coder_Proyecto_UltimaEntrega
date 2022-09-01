import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosAltaComponent } from './componentes/usuarios-alta/usuarios-alta.component';



const routes: Routes = [
  {path:'', children:[
    {path:'alta', component:UsuariosAltaComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class UsuariosRoutingModule { }
