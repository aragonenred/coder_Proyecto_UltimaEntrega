import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosModule } from './alumnos/alumnos.module';
import { ListaComponent } from './alumnos/componentes/lista/lista.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { CursosComponent } from './cursos/cursos.component';
import { AuthComponent } from './core/login/componentes/auth/auth.component';
import { AppComponent } from './app.component';
import { InicioComponent } from './core/inicio/inicio.component';


const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'alumnos', component:AlumnosComponent},
  {path:'cursos', component:CursosComponent},
  {path:'login', component:AuthComponent},
  {path:'', component:InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
