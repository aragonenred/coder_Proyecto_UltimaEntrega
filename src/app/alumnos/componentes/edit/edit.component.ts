import { Component, Inject, inject, OnInit } from '@angular/core';
import { Alumnos } from '../../interfaces/alumnos';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  paises:string[]= ['Argentina','Bolivia', 'Brasil','Chile', 'Paraguay', 'Uruguay' ];

  formulario!: FormGroup ;

  constructor(
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumnos
  ) {
    this.formulario = new FormGroup({
      nombre: new FormControl(data.nombre, [Validators.required]),
      apellido: new FormControl(data.apellido, [Validators.required]),
      documento: new FormControl(data.documento, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(8)]),
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      nacimiento: new FormControl(data.nacimiento, [Validators.required]),
      pais: new FormControl(data.pais,[Validators.required])
    });
  }

  cerrar(){
    this.dialogRef.close();
  }

  actualizar(){
    this.dialogRef.close(this.formulario.value);
  }

  ngOnInit(): void {
  }

}
