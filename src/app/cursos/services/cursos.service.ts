import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cursos } from '../../models/cursos';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursosObservable:Observable<any>;
  cursosSubject:Subject<any>;
  api:string = environment.api;


  cursos: Cursos[] =[]

  constructor(private http:HttpClient) {
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


   /***Nuevas funciones para integrar API */
   private getCursos():Observable<Cursos[]>{
    return this.http.get<Cursos[]>(`${this.api}/curso`);
   }
   cargarCursos(){
    this.getCursos().subscribe((cursos)=>{
      this.cursosSubject.next(cursos);
    });
   }

   postCursos(data:Cursos){
    return this.http.post(`${this.api}/curso`, data);
   }

   /**Discontinuada al implementar redux* */
  /* crearCurso(data:Cursos){
    this.postCursos(data).subscribe(()=>{
      this.cargarCursos();
    });
   }*/

   deteleCurso(id:string){
    return this.http.delete<Cursos>(`${this.api}/curso/${id}`);
   }

   /**Discontinuada al implementar Redux */
   /*
   borrarCurso(id:string){
    if(id){
      this.deteleCurso(id).subscribe(()=>{
        this.cargarCursos();
        alert("Se eliminó el curso: #:" +id);
      });
    }else{
      console.log("No se encontro el id del curso");
    }
   }*/

   private putCursos(data:Cursos){
    return this.http.put<Cursos>(`${this.api}/curso/${data.id}`,data);
   }
   edutarCursos(data:Cursos){
    this.putCursos(data).subscribe(()=>{
      this.cargarCursos();
      alert("Se modificó el curso: #" + data.id);
    });
   }

   /**Implementa Redux */
   obtenerCursos():Observable<Cursos[]>{
    return this.http.get<Cursos[]>(`${this.api}/curso`);
   }

}
