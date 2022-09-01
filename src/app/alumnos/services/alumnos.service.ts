import { Injectable } from '@angular/core';
import { Alumnos } from '../interfaces/alumnos';
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

 /* alumnos: Alumnos[]=[
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18653421", email: "ana.maria@gmail.com", nacimiento: "1988-01-23", pais: "Argentina", habilitado: true},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615987", email: "juan@gmail.com", nacimiento: "2001-09-10", pais: "Uruguay", habilitado: true},
    {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "24895678", email: "mauro@gmail.com.ar", nacimiento: "1995-09-11", pais: "Chile", habilitado: true},
    {nombre: "Emmanuel Eduardo", apellido: "Riccillo", documento: "33692758", email: "ana.maria@gmail.com", nacimiento: "2003-01-09", pais: "Argentina", habilitado: true},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615187", email: "juan@gmail.com", nacimiento: "1981-09-29", pais: "Bolivia", habilitado: true},
    {nombre: "Ornela Florencia", apellido: "Marinelli", documento: "32615758", email: "mauro@gmail.com.ar", nacimiento: "1997-02-16", pais: "Paraguay", habilitado: false},
    {nombre: "Maria Ana", apellido: "Fernandez", documento: "18613411", email: "ana.maria@gmail.com", nacimiento: "1998-09-01", pais: "Brasil", habilitado: true},
    {nombre: "Juan Alberto", apellido: "Paez", documento: "23615480", email: "juan@gmail.com", nacimiento: "1998-09-01", pais: "Uruguay", habilitado: true},
    {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "44495678", email: "mauro@gmail.com.ar", nacimiento: "1998-09-01", pais: "Paraguay", habilitado: true}
    ];*/

    alumnos: Alumnos[] =[];

  paises:string[]= ['Argentina','Bolivia', 'Brasil','Chile', 'Honduras' , 'Paraguay', 'Uruguay'];

  alumnosSubject:Subject<any>;

  constructor(private http:HttpClient) {
      /**Funcion anterior para traer los alumnos*/
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

  /* Funcion anterior para borrar alumnos
  //Funcion que recibe un objeto alumno y lo elimina de la lista. Luego genera un next en el subject para informar el cambio
  deleteAlumno(elemento:Alumnos){
    this.alumnos.forEach((alumno, index) => {
      if(alumno.documento === elemento.documento){
        this.alumnos.splice(index, 1);
      }
    });
    this.alumnosSubject.next(this.alumnos);
  }*/

  /**Nuevas funciones para integrar API */
  private getAlumnos():Observable<Alumnos[]>{
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
      console.log("No se encontro el id del alumno");
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
