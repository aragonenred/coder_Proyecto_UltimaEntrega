import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from '../login/services/login.service';
import { Sesion } from '../login/interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService:LoginService, private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginService.obtenerSesion().pipe(
      map((sesion:Sesion) => {
        if(sesion.sesionActiva){
          return true;
        }else{
          this.router.navigate(['login']);
          return false;
        }
      })
    );

  }
}
