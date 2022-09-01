import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuarios-alta',
  templateUrl: './usuarios-alta.component.html',
  styleUrls: ['./usuarios-alta.component.css']
})
export class UsuariosAltaComponent implements OnInit {

  perfiles =['user', 'admin']
  formulario:FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      perfil: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
  }

}
