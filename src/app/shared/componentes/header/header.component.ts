import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../core/login/services/login.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  salir(){
    this.loginService.cerrarSesion();
  }

}
