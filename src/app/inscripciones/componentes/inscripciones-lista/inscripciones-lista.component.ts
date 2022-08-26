import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Inscripciones } from '../../interfaces/inscripciones';
import { Subscription, map } from 'rxjs';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Cursos } from '../../../cursos/interfaces/cursos';
import { Alumnos } from '../../../alumnos/interfaces/alumnos';


export interface DataTableInscripciones { alumno: string, dni: string, cursoid: string, curso: string, duracion: string, profesor: string}


@Component({
  selector: 'app-inscripciones-lista',
  templateUrl: './inscripciones-lista.component.html',
  styleUrls: ['./inscripciones-lista.component.css']
})
export class InscripcionesListaComponent implements OnInit, OnDestroy {

  columnas:string[] = ['alumno', 'dni', 'cursoid', 'curso', 'profesor', 'acciones'];
  inscripciones:Inscripciones[] = [];
  inscripcionesSuscription!: Subscription;
  dataTableInscripciones:DataTableInscripciones[]=[];
  dataSource!:MatTableDataSource<DataTableInscripciones>;

  @ViewChild(MatTable) tabla!:MatTable<DataTableInscripciones>;

  constructor(private inscripcionesService:InscripcionesService) {

  }

  ngOnInit(): void {
    this.cargaDataSource()
  }

  ngOnDestroy(): void {
    this.inscripcionesSuscription.unsubscribe();
  }

  //Funcion que realiza la carga de la tabla de inscripciones.
  loadTableInscripciones(alumnoActivo:Alumnos){
    this.inscripcionesSuscription = this.inscripcionesService.getInscripcionesObservable()
    .pipe(
      map((inscripciones:any[])=>inscripciones.filter(inscripcion=>inscripcion.dni == alumnoActivo.documento))
    )
    .subscribe((inscripciones)=>{
      this.inscripciones = inscripciones;
      if(this.dataSource){
        this.renderTable();
      }
    });
    this.cargaDataSource();
    this.renderTable();
  }

  cargaDataSource(){
    this.dataTableInscripciones.splice(0,this.dataTableInscripciones.length);
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
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

  renderTable(){
    this.dataSource = new MatTableDataSource(this.dataTableInscripciones);
    this.tabla.renderRows();
  }

  eliminarInscripcion(elemento:DataTableInscripciones){
    let data:Inscripciones = {
          alumno: elemento.alumno,
          dni: elemento.dni,
          cursos:[{id: elemento.cursoid,
                   titulo:elemento.curso,
                   duracion:elemento.duracion,
                   profesor:elemento.profesor}]
    };

    this.inscripcionesService.deleteInscripciones(data);
    this.cargaDataSource();

  }

  agregarInscripcion(curso:Cursos, alumno:Alumnos){
      /*this.dataTableInscripciones.push({
        alumno: alumno.nombre + ' ' + alumno.apellido,
        dni: alumno.documento,
        cursoid: curso.id,
        curso: curso.titulo,
        duracion: curso.duracion,
        profesor: curso.profesor
      });*/

      this.inscripcionesService.addInscripcion(
        {alumno: alumno.nombre,
         dni: alumno.documento,
         cursos:[{ id:curso.id,
                   titulo: curso.titulo,
                   duracion:curso.duracion,
                   profesor:curso.profesor}]
        });
        this.cargaDataSource();
  }

}
