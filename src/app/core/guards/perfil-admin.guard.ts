import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from '../login/services/login.service';
import { Sesion } from '../login/interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class PerfilAdminGuard implements CanActivate {

  constructor(private loginService:LoginService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.loginService.obtenerSesion().pipe(
      map((sesion:Sesion)=>{
        if(sesion.usuario?.perfil === 'admin'){
          return true
        }else{
          console.log(sesion.usuario?.perfil);
          alert("No tenes permisos para acceder a este módulo!");
          return false
        }
      })
    );


  }

}
