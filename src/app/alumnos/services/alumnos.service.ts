import { Injectable } from '@angular/core';
import { Alumnos } from '../../models/alumnos';
import { observable, Observable, Observer, Subject, Subscriber, BehaviorSubject } from 'rxjs';
import { SubscribableOrPromise } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumnosObservable:Observable<any>;

  private api:string = environment.api;

  alumnos: Alumnos[] =[];

  paises:string[]= ['Argentina','Bolivia', 'Brasil','Chile', 'Honduras' , 'Paraguay', 'Uruguay'];

  alumnosSubject:Subject<any>;

  constructor(private http:HttpClient) {
      this.alumnosObservable = new Observable<any>((suscriptor)=>{
      //Envío la lista de alumnos al iniciar
      suscriptor.next(this.alumnos);

      //Me suscribo al Subject alumnosSubject y cuando se agrega o elimina un alumno genero un next para enviar la lista de alumnos actualizada.
      this.alumnosSubject.subscribe((alumnos)=>{
        suscriptor.next(alumnos);
      });

    });

    this.alumnosSubject = new Subject();

  }

  //Promesa para obtener la lista de paises
  getPaisesPromise(){
    let promise =  new Promise((resolve, reject)=>{
      if(this.paises.length >0){
        resolve(this.paises);
      }else{
        reject({
          codigo:404,
          error: 'No se pudieron cargar los paises'
        });
      }

    });
    return promise;
  }


  getAlumnosObservable(){
    return this.alumnosObservable;
  }

  //Funcion que recibe un objeto alumno y lo agrega a la lista. Luego genera un next en el subject para informar el cambio
  addAlumno(alumno:Alumnos){
    this.alumnos.push(alumno);
    this.alumnosSubject.next(this.alumnos);
  }


  /**Nuevas funciones para integrar API */
   getAlumnos():Observable<Alumnos[]>{
    return this.http.get<Alumnos[]>(`${this.api}/alumnos`);
  }
  cargarAlumnos(){
    this.getAlumnos().subscribe((alumnos)=>{
      this.alumnosSubject.next(alumnos);
    });
  }


  private postAlumno(data:Alumnos){
    return this.http.post(`${this.api}/alumnos`, data);
  }
  crearAlumno(data:Alumnos){
    return this.postAlumno(data).subscribe(()=>{
      this.cargarAlumnos();
    });
  }

  private deleteAlumno(id: string){
    return this.http.delete<Alumnos>(`${this.api}alumnos/${id}`);
  }
  borrarAlumno(id:string){
    if(id){
      this.deleteAlumno(id).subscribe((alumno:Alumnos)=>{
        this.cargarAlumnos();
        alert("Se elimino el Alumno: #" + id);

      });
    }else{
      alert("No se encontro el id del alumno");
    }
  }

  putAlumno(alumno:Alumnos){
    return this.http.put<Alumnos>(`${this.api}/alumnos/${alumno.id}`, alumno);
  }
  editarAlumno(alumno:Alumnos){
    this.putAlumno(alumno).subscribe(()=>{
      this.cargarAlumnos();
      alert("Se modificó el alumno: #" + alumno.id);
    });
  }


}
