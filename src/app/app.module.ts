import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnosModule } from './alumnos/alumnos.module';
import { HeaderComponent } from './shared/componentes/header/header.component';
import { SidebarComponent } from './shared/componentes/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { CursosModule } from './cursos/cursos.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { AuthComponent } from './core/login/componentes/auth/auth.component';
import { LoginModule } from './core/login/login.module';
import { InicioComponent } from './core/inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //AlumnosModule, //Lo cargo desde el app-routing.module.ts usando lazy loading
    //CursosModule, //Lo cargo desde el app-routing.module.ts usando lazy loading
    //InscripcionesModule, //Lo cargo desde el app-routing.module.ts usando lazy loading
    LoginModule,

    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
