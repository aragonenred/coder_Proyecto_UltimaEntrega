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
 // {path:'alumnos', component:AlumnosComponent},
  {path:'alumnos', loadChildren:() =>import('./alumnos/alumnos.module').then((m)=>m.AlumnosModule)},
  //{path:'cursos', component:CursosComponent},
  {path:'cursos', loadChildren:()=>import('./cursos/cursos.module').then((m)=>m.CursosModule)},
  {path:'inscripciones', loadChildren: ()=>import('./inscripciones/inscripciones.module').then((m)=>m.InscripcionesModule)},

  {path:'login', component:AuthComponent},
  {path:'', redirectTo:'inicio', pathMatch:'full'},
  {path:'**', redirectTo:'inicio', pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
