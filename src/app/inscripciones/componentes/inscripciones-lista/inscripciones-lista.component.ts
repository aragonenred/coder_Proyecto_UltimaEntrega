import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Inscripciones } from '../../../models/inscripciones';
import { Subscription, map } from 'rxjs';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Cursos } from '../../../models/cursos';
import { Alumnos } from '../../../models/alumnos';
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'app-inscripciones-lista',
  templateUrl: './inscripciones-lista.component.html',
  styleUrls: ['./inscripciones-lista.component.css']
})
export class InscripcionesListaComponent implements OnInit, OnDestroy {

  columnas:string[] = ['alumno', 'dni', 'cursoid', 'curso', 'profesor', 'acciones'];
  inscripciones:Inscripciones[] = [];
  inscripcionesSuscription!: Subscription;
  dataTableInscripciones:Inscripciones[]=[];
  dataSource!:MatTableDataSource<Inscripciones>;

  @ViewChild(MatTable) tabla!:MatTable<Inscripciones>;

  constructor(private inscripcionesService:InscripcionesService) {

  }

  ngOnInit(): void {
    this.cargaDataSource()
  }

  ngOnDestroy(): void {
    if(this.inscripcionesSuscription){
      this.inscripcionesSuscription.unsubscribe();
    }

  }

  //Funcion que realiza la carga de la tabla de inscripciones.
  loadTableInscripciones(alumnoActivo:Alumnos){

    /*this.inscripcionesSuscription = this.inscripcionesService.getInscripcionesObservable()
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
    this.renderTable();*/
    this.inscripcionesSuscription = this.inscripcionesService.inscripcionesSubject.asObservable()
    .pipe(
      map((inscripciones:any[])=>inscripciones.filter(inscripcion=>inscripcion.dni == alumnoActivo.documento))
    )
    .subscribe((inscripciones)=>{
      console.log("loadtable");
      console.log(inscripciones);
      this.inscripciones = inscripciones;
      if(this.dataSource){
        this.cargaDataSource();
        this.renderTable();

      }
    });
    this.inscripcionesService.cargarInscripciones();
    this.renderTable();
  }

  cargaDataSource(){
    this.dataTableInscripciones.splice(0,this.dataTableInscripciones.length);

    this.inscripciones.forEach((inscripcion, index)=>{
         this.dataTableInscripciones.push({
            id: inscripcion.id,
            alumno: inscripcion.alumno,
            dni: inscripcion.dni,
            cursoid: inscripcion.cursoid,
            curso: inscripcion.curso,
            duracion: inscripcion.duracion,
            profesor: inscripcion.profesor
        });
      });

    this.dataSource = new MatTableDataSource<Inscripciones>(this.dataTableInscripciones);
  }

  filtrar(event:Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

  renderTable(){
    this.dataSource = new MatTableDataSource(this.dataTableInscripciones);
    this.tabla.renderRows();
  }

  eliminarInscripcion(elemento:Inscripciones){

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
         id:curso.id,
         curso: curso.titulo,
         duracion:curso.duracion,
         profesor:curso.profesor}
      );
        this.cargaDataSource();
  }

}
