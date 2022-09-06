import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Inscripciones } from '../../../models/inscripciones';
import { Subscription, map } from 'rxjs';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Cursos } from '../../../models/cursos';
import { Alumnos } from '../../../models/alumnos';
import { ThisReceiver } from '@angular/compiler';
import { ContentObserver } from '@angular/cdk/observers';



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

    this.inscripcionesSuscription = this.inscripcionesService.inscripcionesSubject.asObservable()
    .pipe(
      map((inscripciones:any[])=>inscripciones.filter(inscripcion=>inscripcion.dni == alumnoActivo.documento))
    )
    .subscribe((inscripciones)=>{
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
    this.dataTableInscripciones.splice(0,this.inscripciones.length);
    this.dataSource = new MatTableDataSource<Inscripciones>(this.inscripciones);
  }

  filtrar(event:Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

  renderTable(){
    this.dataSource = new MatTableDataSource(this.inscripciones);
    this.tabla.renderRows();
  }

  eliminarInscripcion(elemento:Inscripciones){
    if(elemento.id){
      this.inscripcionesService.borrarInscripcion(elemento.id);
    }
    this.cargaDataSource();
  }

  agregarInscripcion(curso:Cursos, alumno:Alumnos){
      this.inscripcionesService.crearInscripcion(
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
