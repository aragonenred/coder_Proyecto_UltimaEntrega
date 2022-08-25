import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Inscripciones } from '../../interfaces/inscripciones';
import { Subscription } from 'rxjs';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Cursos } from '../../../cursos/interfaces/cursos';
import { Alumnos } from '../../../alumnos/interfaces/alumnos';


export interface DataTableInscripciones { alumno: string, dni: string, cursoid: string, curso: string, duracion: string, profesor: string}


@Component({
  selector: 'app-inscripciones-lista',
  templateUrl: './inscripciones-lista.component.html',
  styleUrls: ['./inscripciones-lista.component.css']
})
export class InscripcionesListaComponent implements OnInit {

  columnas:string[] = ['alumno', 'dni', 'cursoid', 'curso', 'profesor', 'acciones'];
  inscripciones:Inscripciones[] = [];
  inscripcionesSuscription: Subscription;
  dataTableInscripciones:DataTableInscripciones[]=[];
  dataSource!:MatTableDataSource<DataTableInscripciones>;


  @ViewChild(MatTable) tabla!:MatTable<DataTableInscripciones>;

  constructor(private inscripcionesService:InscripcionesService) {
    this.inscripcionesSuscription = this.inscripcionesService.getInscripcionesObservable()
    .subscribe((inscripciones)=>{
      this.inscripciones = inscripciones;
      if(this.dataSource){
        this.renderTable();
      }
    });
  }

  ngOnInit(): void {
    this.cargaDataSource()
  }

  cargaDataSource(){
    this.inscripciones.forEach((inscripcion, index)=>{
      inscripcion.cursos.forEach((curso, index)=>{
        this.dataTableInscripciones.push({
            alumno: inscripcion.alumno,
            dni: inscripcion.dni,
            cursoid: curso.id,
            curso: curso.titulo,
            duracion: curso.duracion,
            profesor: curso.profesor
        });
      });

    });
    this.dataSource = new MatTableDataSource<DataTableInscripciones>(this.dataTableInscripciones);
  }

  filtrar(event:Event){

  }
  renderTable(){
    this.dataSource = new MatTableDataSource(this.dataTableInscripciones);
    this.tabla.renderRows();
  }

  eliminarInscripcion(element:Element){

  }

  agregarInscripcion(curso:Cursos, alumno:Alumnos){
      this.dataTableInscripciones.push({
        alumno: alumno.nombre + ' ' + alumno.apellido,
        dni: alumno.documento,
        cursoid: curso.id,
        curso: curso.titulo,
        duracion: curso.duracion,
        profesor: curso.profesor
      })
      console.log(this.dataTableInscripciones);
      this.renderTable();

  }

}
