import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cursos } from '../../../models/cursos';

@Component({
  selector: 'app-cursos-edit',
  templateUrl: './cursos-edit.component.html',
  styleUrls: ['./cursos-edit.component.css']
})
export class CursosEditComponent implements OnInit {

  formulario!: FormGroup;
  constructor(
        private dialogRef:MatDialogRef<CursosEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data:Cursos
    ) {
      this.formulario = new FormGroup({
        id: new FormControl(data.id, [Validators.required]),
        titulo: new FormControl(data.titulo, [Validators.required]),
        duracion: new FormControl(data.duracion, [Validators.required]),
        profesor: new FormControl(data.profesor, [Validators.required]),
      });
    }

  ngOnInit(): void {
  }
  cerrar(){
    this.dialogRef.close();
  }

  actualizar(){
    this.dialogRef.close(this.formulario.value);
  }

}
