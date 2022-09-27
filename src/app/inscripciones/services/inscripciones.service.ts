import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Inscripciones } from '../../models/inscripciones';
import { Alumnos } from '../../models/alumnos';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  inscripcionesObservable:Observable<any>;
  inscripcionesSubject:Subject<any>;
  private api:string = environment.api;

  inscripciones: Inscripciones[] =[];

  constructor(private http: HttpClient) {
    this.inscripcionesObservable = new Observable<any>((suscriptor)=>{
      suscriptor.next(this.inscripciones);
      this.inscripcionesSubject.subscribe((inscripciones)=>{
        suscriptor.next(inscripciones);
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


   /**Nuevas funciones para integrar API */
   private getInscripciones():Observable<Inscripciones[]>{
     return this.http.get<Inscripciones[]>(`${this.api}/inscripciones`);
   }
   cargarInscripciones(){
    this.getInscripciones().subscribe((inscripciones)=>{
      this.inscripcionesSubject.next(inscripciones);
    });
   }

   private postInscripcion(data:Inscripciones){
    return this.http.post(`${this.api}/inscripciones`, data);
   }
   crearInscripcion(data:Inscripciones){
    return this.postInscripcion(data).subscribe(()=>{
      this.cargarInscripciones();
    });
   }

   private deleteInscripcion(id:string){
    return this.http.delete<Inscripciones>(`${this.api}/inscripciones/${id}`);
   }
   borrarInscripcion(id:string){
    if(id){
      this.deleteInscripcion(id).subscribe(()=>{
        this.cargarInscripciones();
        alert("Se eliminó la inscripcion: #" + id);
      })
    }else{
      alert("No se encontró el id de la inscripcion");
    }

   }





}
