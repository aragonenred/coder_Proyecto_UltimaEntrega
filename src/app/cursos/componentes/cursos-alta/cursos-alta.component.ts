import { Component, OnInit, ViewChild } from '@angular/core';
import { Cursos } from '../../../models/cursos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import { CursosListaComponent } from '../cursos-lista/cursos-lista.component';

@Component({
  selector: 'app-cursos-alta',
  templateUrl: './cursos-alta.component.html',
  styleUrls: ['./cursos-alta.component.css']
})
export class CursosAltaComponent implements OnInit {

  curso!:Cursos;
  showForm:boolean = false;
  @ViewChild(CursosListaComponent) tabla?: CursosListaComponent;

  formulario: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    titulo: new FormControl('', [Validators.required]),
    duracion: new FormControl('', [Validators.required]),
    profesor: new FormControl('', [Validators.required]),
  });


  constructor() {  }

  ngOnInit(): void {
  }

  activarForm(){
    if(this.showForm === true){
      this.showForm= false;
    }else{
      this.showForm= true;
    }
  }

  agregarCurso(){
    this.curso = {
            id: this.formulario.get('id')?.value,
            titulo: this.formulario.get('titulo')?.value,
            duracion: this.formulario.get('duracion')?.value,
            profesor: this.formulario.get('profesor')?.value
    }
    if(this.formulario.status ==='VALID'){
      this.tabla?.agregarCurso(this.curso);
      this.formulario.reset();
    }else{
      alert('Opps! hay datos que te faltan completar 😕')
    }
  }

  reset(){
    this.formulario.reset();
  }


}
