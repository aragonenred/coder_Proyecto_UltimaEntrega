import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Inscripciones } from '../interfaces/inscripciones';
import { Alumnos } from '../../alumnos/interfaces/alumnos';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  inscripcionesObservable:Observable<any>;
  inscripcionesSubject:Subject<any>;

  inscripciones: Inscripciones[] =[
    {alumno: 'Eduardo Riccillo', dni:'33692758', cursos:[{id:'DW001', titulo: 'Angular', duracion: '4 Semanas' , profesor:"Juan Perez" }]},
    {alumno: 'Ornela Mazual', dni:'32615758', cursos:[{id:'DW001', titulo: 'Angular', duracion: '4 Semanas' , profesor:"Juan Perez" },
                                                    {id:'BK001', titulo: 'C#', duracion: '9 Semanas' , profesor:"Fernando Septimo" }]}

  ]


  constructor() {
    this.inscripcionesObservable = new Observable<any>((suscriptor)=>{
      suscriptor.next(this.inscripciones);
      this.inscripcionesSubject.subscribe((inscripciones)=>{
        suscriptor.next(this.inscripciones);
      });
    });
    this.inscripcionesSubject = new Subject();
   }

   getInscripcionesObservable(){
    return this.inscripcionesObservable;
   }

   addInscripcion(inscripcion:Inscripciones){
    this.inscripciones.push(inscripcion);
    this.inscripcionesSubject.next(this.inscripciones);
   }

   deleteInscripciones(elemento:Inscripciones){
      this.inscripciones.forEach((inscripcion, index)=>{
          if(inscripcion.dni === elemento.dni){
            this.inscripciones[index].cursos.forEach((curso, indexcurso)=>{
              if(curso.id === elemento.cursos[0].id){
                this.inscripciones[index].cursos.splice(indexcurso,1);
              }
            })
          }
      });
   }




}
