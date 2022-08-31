import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './componentes/auth/auth.component';
import { MaterialModule } from '../../shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class LoginModule { }
