import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Alumnos } from '../../../models/alumnos';
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
  alumnoActivo!:Alumnos;

  @ViewChild(InscripcionesListaComponent) tablaInscripciones?:InscripcionesListaComponent;


  constructor(private alumnosService:AlumnosService, private dialog:MatDialog) {

  }

  ngOnInit(): void {

  }

  buscarAlumno(){
    const dialogEdit = this.dialog.open(BuscarAlumnosComponent,{width:'700px', maxHeight:'500px'});
    dialogEdit.afterClosed().subscribe((resultado) => {
      if(resultado){
        this.alumnoActivo = resultado;
        this.tablaInscripciones?.loadTableInscripciones(this.alumnoActivo);
      }
    });

  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }



  agregarCurso(){
    const dialogEdit = this.dialog.open(BuscarCursosComponent,{width:'700px', maxHeight:'500px'});
    dialogEdit.afterClosed().subscribe((resultado) => {
      if(resultado){
        this.tablaInscripciones?.agregarInscripcion(resultado, this.alumnoActivo);
      }
    });
  }

}
