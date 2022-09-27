import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Alumnos } from '../../../models/alumnos';
import { Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';

@Component({
  selector: 'app-buscar-alumnos',
  templateUrl: './buscar-alumnos.component.html',
  styleUrls: ['./buscar-alumnos.component.css']
})
export class BuscarAlumnosComponent implements OnInit {

  columnas:string[] = ['nombre', 'documento', 'email', 'nacimiento', 'pais', 'acciones'];
  alumnos:Alumnos[] =[];
  selectedAlumno!:Alumnos;
  alumnoSuscription: Subscription;
  dataSource!:MatTableDataSource<Alumnos>;

  @ViewChild(MatTable) tabla!:MatTable<Alumnos>;

  constructor(
    private dialogRef:MatDialogRef<BuscarAlumnosComponent>,
    private alumnosService:AlumnosService,
    @Inject(MAT_DIALOG_DATA) public data:Alumnos
  ) {

    this.alumnoSuscription = this.alumnosService.alumnosSubject.asObservable()
    .subscribe((alumnos)=>{
      this.alumnos = alumnos;
      //Si dataSource se inicializó (pasó por lo menos una vez por el ngOnInit) llamo a la funcion que renderiza la tabla para que actualice los datos
      if(this.dataSource){
        this.renderTable();
      }
    });
    //Llamo a la funcion cargarAlumnos para que traiga desde la API y genere un next.
    alumnosService.cargarAlumnos();

   }

  cerrar(){
    this.dialogRef.close();
  }

  selectAlumno(element:Alumnos){
    this.selectedAlumno = element;
  }

  agregar(){
    this.dialogRef.close(this.selectedAlumno);
  }

  renderTable(){
    this.dataSource = new MatTableDataSource(this.alumnos);
    this.tabla.renderRows();
  }

  filtrar(event:Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Alumnos>(this.alumnos);
  }

}
