import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaComponent } from './componentes/alta/alta.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path:'alumnos', children:[
    {path:'alta', component:AltaComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AlumnosRoutingModule { }
