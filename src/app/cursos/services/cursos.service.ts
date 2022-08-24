import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cursos } from '../interfaces/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursosObservable:Observable<any>;
  cursosSubject:Subject<any>;

  cursos: Cursos[] =[
    {id:'DW001', titulo: 'Angular', duracion: '4 Semanas' , profesor:"Juan Perez" },
    {id:'BK001', titulo: 'C#', duracion: '9 Semanas' , profesor:"Fernando Septimo" },
    {id:'DB001', titulo: 'SQL', duracion: '5 Semanas' , profesor:"Mario Sosa" }
  ]


  constructor() {
    this.cursosObservable = new Observable<any>((suscriptor)=>{
      suscriptor.next(this.cursos);

      this.cursosSubject.subscribe((cursos)=>{
        suscriptor.next(this.cursos);
      });
    });

    this.cursosSubject = new Subject();

   }



   getCursosObservable(){
    return this.cursosObservable;
   }

   addCurso(curso:Cursos){
    this.cursos.push(curso);
    this.cursosSubject.next(this.cursos);
   }

   deleteCurso(elemento:Cursos){
    this.cursos.forEach((curso, index) =>{
        if(curso.id === elemento.id){
          this.cursos.splice(index, 1);
        }
    });
    this.cursosSubject.next(this.cursos);
   }



}
