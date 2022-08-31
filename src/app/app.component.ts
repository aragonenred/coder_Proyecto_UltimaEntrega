import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { SidebarComponent } from './shared/componentes/sidebar/sidebar.component';
import { environment } from '../environments/environment';
import { LoginService } from './core/login/services/login.service';
import { observable, Observable } from 'rxjs';
import { Sesion } from './core/login/interfaces/sesion';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Segunda Entrega - Proyecto Final';
  authenticated:boolean = false;
  sizeDisplay?:string;
  @ViewChild(SidebarComponent) sidebar?:SidebarComponent;

  constructor(public breakpointObserver: BreakpointObserver, private loginsevice:LoginService){
    this.mediaQuery();
    /**Me suscribo al authenticatedSubject para saber cuando hay un login o un logout */
    loginsevice.authenticatedSubject.subscribe(()=>{
        this.authenticated = environment.authenticated;
    });

  }

  ngOnInit(): void {
    this.loginsevice.obtenerSesion().subscribe((sesion)=>{
      if(sesion.sesionActiva){
        this.authenticated = true;
      }else{
        this.authenticated = false;
        console.log("appcomponent aut false");
      }
    });
  }

  public mediaQuery() {
    this.breakpointObserver
    .observe(['(max-width: 768px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidebar?.toggleMenu(false);
      }
    });
    this.breakpointObserver
    .observe(['(min-width: 768px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.sidebar?.toggleMenu(true);
      }
    });
  }




}
