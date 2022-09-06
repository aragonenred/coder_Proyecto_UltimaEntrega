import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../core/login/services/login.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   usuarioLogueado?:string;

  constructor(private loginService:LoginService) {
      loginService.obtenerSesion().subscribe((sesion)=>{
        if(sesion.usuario){
          this.usuarioLogueado = sesion.usuario.nombre;
        }else{
          this.usuarioLogueado = "Invitado";
        }

      });
   }

  ngOnInit(): void {
  }

  salir(){
    this.loginService.cerrarSesion();
  }

}
