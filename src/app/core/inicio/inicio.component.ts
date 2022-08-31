import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  authenticated:boolean = false;

  constructor(private loginsevice:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loginsevice.obtenerSesion().subscribe((sesion)=>{
      console.log(sesion);
      if(sesion.sesionActiva){
        this.authenticated = true;
      }else{
        this.authenticated = false;
        console.log("appcomponent inicio false");
        this.router.navigate(['login']);
      }
    });
  }

}
