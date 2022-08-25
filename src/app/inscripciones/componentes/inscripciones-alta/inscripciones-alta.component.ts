import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Alumnos } from '../../../alumnos/interfaces/alumnos';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BuscarCursosComponent } from '../buscar-cursos/buscar-cursos.component';
import { InscripcionesListaComponent } from '../inscripciones-lista/inscripciones-lista.component';
import { BuscarAlumnosComponent } from '../buscar-alumnos/buscar-alumnos.component';

@Component({
  selector: 'app-inscripciones-alta',
  templateUrl: './inscripciones-alta.component.html',
  styleUrls: ['./inscripciones-alta.component.css']
})
export class InscripcionesAltaComponent implements OnInit {

  dataSource!: MatTableDataSource<Alumnos>;
  columnas:string[]=['nombre', 'apellido', 'accion'];
  //alumnos:Alumnos[] = [];
  //alumnosSuscrition!: Subscription;
  alumnoActivo!:Alumnos;
 // @ViewChild(MatTable) tabla!:MatTable<Alumnos>;
  @ViewChild(InscripcionesListaComponent) tablaInscripciones?:InscripcionesListaComponent;

  //showTableAlumnos:boolean = false;

  constructor(private alumnosService:AlumnosService, private dialog:MatDialog) {
    /*this.alumnosSuscrition = this.alumnosService.getAlumnosObservable()
    .subscribe((alumnos)=>{
      this.alumnos = alumnos;
      if(this.dataSource){
        this.renderTable();
      }
    });*/
  }

  ngOnInit(): void {
   // this.dataSource = new MatTableDataSource<Alumnos>(this.alumnos)
  }

  /*
  keyDownNombre(event:Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    if(valorObtenido !=''){
      this.showTableAlumnos = true;
      this.filtrar(event);
    }else{
      this.showTableAlumnos=false;
    }

  }*/

  buscarAlumno(){
    const dialogEdit = this.dialog.open(BuscarAlumnosComponent,{width:'700px', height:'500px'});
    dialogEdit.afterClosed().subscribe((resultado) => {
      if(resultado){
        this.alumnoActivo = resultado;
      }
    });

  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

 /* renderTable(){
    this.dataSource = new MatTableDataSource(this.alumnos);
    this.tabla.renderRows();
  }*/

  agregarCurso(){
    const dialogEdit = this.dialog.open(BuscarCursosComponent,{width:'700px'});
    dialogEdit.afterClosed().subscribe((resultado) => {
      if(resultado){
        this.tablaInscripciones?.agregarInscripcion(resultado, this.alumnoActivo);
      }
    });
  }

}
