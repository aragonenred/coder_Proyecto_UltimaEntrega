import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CursosAltaComponent } from './componentes/cursos-alta/cursos-alta.component';



const routes: Routes = [
  {path:'cursos', children:[
    {path:'alta', component:CursosAltaComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class CursosRoutingModule { }
