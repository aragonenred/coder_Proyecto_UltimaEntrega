import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { LoginService } from '../../../core/login/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

 usuarioLogueado?:string;
 perfilLogueado?:string;
 selectMenu?:string;
 // timeLoginSuscripcion: Subscription;
 timeLogin$:Observable<any>;

 constructor(private loginService:LoginService) {

   //this.timeLoginSuscripcion = this.loginService.timeLoginObservable.subscribe((time)=>{
    // this.timeLogin = time;
   //})
   loginService.obtenerSesion().subscribe((sesion)=>{
    if(sesion.usuario?.nombre){
      this.usuarioLogueado = sesion.usuario?.nombre;
      this.perfilLogueado = sesion.usuario.perfil;
    }else{
      this.usuarioLogueado = "Usuario Invitado"
      this.perfilLogueado = "Invitado";
    }

   });
   this.timeLogin$ = this.loginService.timeLoginObservable;
  }

 ngOnInit(): void {


 }


 hidden:boolean = true;

 toggleMenu(hide:boolean){
   this.hidden=hide;
 }

 toggleMenuButton(){
   if(this.hidden === true){
     this.hidden = false;
   }else{
     this.hidden = true;
   }
 }

 selected(title:string){
  this.selectMenu =title;
 }

 ngOnDestroy():void{
   //this.timeLoginSuscripcion.unsubscribe();
 }
}
