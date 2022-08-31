import { Injectable, Pipe } from '@angular/core';
import { interval, Observable, Subject, map, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Usuarios } from '../interfaces/usuarios';
import { Sesion } from '../interfaces/sesion';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api:string = environment.api;
  sesionSubject!: BehaviorSubject<Sesion>;
  timeLoginObservable: Observable<any>;
  authenticatedSubject:Subject<any>;


  constructor(private http:HttpClient, private router :Router){
    const sesion: Sesion = {
      sesionActiva:false
    }
    this.authenticatedSubject = new Subject();
    this.sesionSubject = new BehaviorSubject(sesion);

    //Observable con el timer para tiempo de conexion del usuario
    this.timeLoginObservable = new Observable<any>((suscriptor) => {
      let seconds:number = 0;
      let minutes:number = 0;
      let hours:number = 0;
     setInterval(()=>{
        let time:string = this.fill(hours) + ':' + this.fill(minutes) + ':' + this.fill(seconds);
        suscriptor.next(time);
        seconds++;
        if(seconds>59){
          minutes++;
          seconds = 0;
        }
        if(minutes>59){
          hours++;
          minutes =0;
        }
     },1000)

      });
  }

  //Funcion que coloca un cero a la izquierda para numeros de dos digitos
  fill(number:number){
      return "0".repeat(2 - number.toString().length) + number.toString();
  }

  //Funcion que realiza el login del usuario
  validarIngreso(authUser:string, authPass:string){
    this.getUsuarios().pipe(
      map((usuarios:Usuarios[])=>{
        return usuarios.filter((u:Usuarios)=> u.username === authUser && u.password ===authPass)[0];
      })
    ).subscribe((usuarios)=>{
      if(usuarios){
        environment.authenticated = true;
        this.authenticatedSubject.next(environment.authenticated);

      }else{
        alert("Usuario no encontrado!");
      }

    });

  }

  inciarSesion(usuario:Usuarios){
     this.getUsuarios().pipe(
        map((usuarios:Usuarios[])=>{
          return usuarios.filter((u:Usuarios)=> u.username === usuario.username && u.password === usuario.password)[0];
        })
     ).subscribe((usuarios)=>{
        if(usuarios){
          this.sesionSubject.next({
                                  sesionActiva:true,
                                  usuario: {username: usuarios.username,
                                            password: usuarios.password }
                                  });
        console.log("true");
        this.router.navigate(['/inicio']);
        }else{
          alert("Usuario no encontrado!");
        }
      });
  }

  cerrarSesion(){
    const sesion: Sesion = {sesionActiva :false}
    this.sesionSubject.next(sesion)
  }

  obtenerSesion(){
    return this.sesionSubject.asObservable();
  }

  logoutUsuario(){
    environment.authenticated = false;
    this.authenticatedSubject.next(environment.authenticated);
  }

  getUsuarios():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.api}/usuarios`);
  }

  postUsuario(usuario:Usuarios){
    usuario.habilitado = true;
    return this.http.post<Usuarios>(`${this.api}/usuarios`, usuario)
  }

  putUsuario(usuario:Usuarios){
    return this.http.put<Usuarios>(`${this.api}/usuarios/${usuario.id}`, usuario);
  }

  deleteUsuario(id:string){
    return this.http.delete<Usuarios>(`${this.api}/usuarios/${id}`);
  }




}


/*
()=>{
        let seconds:number = 50;
        let minutes:number = 59;
        let hours:number = 0;
        let time:string = hours + ':' + minutes + ':' + seconds;
        setInterval(()=>{
            seconds++;
            if(seconds>59){
              minutes++;
              seconds = 0;
            }
            if(minutes>59){
              hours++;
              minutes =0;
            }
        }, 1000);
        return time;
      });
      */
