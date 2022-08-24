import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaComponent } from '../lista/lista.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alumnos } from '../../interfaces/alumnos';
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {

  paises:any=[];

  @ViewChild(ListaComponent) tabla?: ListaComponent;


  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nacimiento: new FormControl('', [Validators.required]),
    pais: new FormControl('',[Validators.required]),
  });

  alumno!:Alumnos;
  showForm:boolean = false;

  constructor(private alumnosService:AlumnosService) {
    this.alumnosService.getPaisesPromise()
      .then((paises)=>{
        this.paises = paises;
      })
      .catch((error)=>{
        console.log(error);
      });


   }
  ngOnInit(): void {

  }
  activarForm(){
    if(this.showForm === true){
      this.showForm= false;
    }else{
      this.showForm= true;
    }
  }
  agregarAlumno(){
    this.alumno = {
            nombre: this.formulario.get('nombre')?.value,
            apellido: this.formulario.get('apellido')?.value,
            documento: this.formulario.get('documento')?.value,
            email: this.formulario.get('email')?.value,
            nacimiento: this.formulario.get('nacimiento')?.value,
            pais: this.formulario.get('pais')?.value,
            habilitado: true
          };
    if(this.formulario.status =='VALID'){
      this.tabla?.agregarAlumno(this.alumno);
      this.formulario.reset();


    }else{
      alert('Opps! hay datos que te faltan completar 😕')
    }
  }

  reset(){
    this.formulario.reset();
  }
}
