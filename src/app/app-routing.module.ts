import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosModule } from './alumnos/alumnos.module';
import { ListaComponent } from './alumnos/componentes/lista/lista.component';
import { AlumnosComponent } from './alumnos/alumnos.component';


const routes: Routes = [
  {path:'alumnos', component:AlumnosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
