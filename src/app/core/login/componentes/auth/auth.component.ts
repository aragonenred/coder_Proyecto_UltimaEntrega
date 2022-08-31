import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../services/login.service';
import { Usuarios } from '../../interfaces/usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  formulario: FormGroup = new FormGroup({
      usuario:new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
  });

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  ingresar(){
    this.loginService.validarIngreso(this.formulario.get('usuario')?.value, this.formulario.get('password')?.value);

  }

  login(){
    const usuario:Usuarios={
      username: this.formulario.value.usuario,
      password: this.formulario.value.password
    }
    this.loginService.inciarSesion(usuario);
  }

}
