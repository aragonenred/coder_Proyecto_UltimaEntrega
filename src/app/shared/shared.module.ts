import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdadPipe } from './pipes/edad.pipe';


@NgModule({
  declarations: [
    EdadPipe
  ],
  imports: [
    CommonModule

  ],
  exports:[
    EdadPipe
  ]

})
export class SharedModule { }
