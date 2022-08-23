import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { LoginService } from '../../../core/login/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {


 // timeLoginSuscripcion: Subscription;
 timeLogin$:Observable<any>;

 constructor(private loginService:LoginService) {

   //this.timeLoginSuscripcion = this.loginService.timeLoginObservable.subscribe((time)=>{
    // this.timeLogin = time;
   //})
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

 ngOnDestroy():void{
   //this.timeLoginSuscripcion.unsubscribe();
 }
}
