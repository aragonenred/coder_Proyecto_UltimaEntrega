import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InscripcionesAltaComponent } from './componentes/inscripciones-alta/inscripciones-alta.component';




const routes: Routes = [
  {path:'inscripciones', children:[
    {path:'alta', component:InscripcionesAltaComponent}

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class InscripcionesRoutingModule { }
