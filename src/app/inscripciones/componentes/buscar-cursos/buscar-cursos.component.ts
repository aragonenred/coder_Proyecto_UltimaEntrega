import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cursos } from '../../../models/cursos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { CursosService } from '../../../cursos/services/cursos.service';

@Component({
  selector: 'app-buscar-alumnos',
  templateUrl: './buscar-cursos.component.html',
  styleUrls: ['./buscar-cursos.component.css']
})
export class BuscarCursosComponent implements OnInit {

  columnas:string[]=['id', 'titulo', 'duracion', 'profesor', 'acciones'];
  cursos:Cursos[] = [];
  selectedCurso!:Cursos;
  cursosSuscription: Subscription;
  dataSource!: MatTableDataSource<Cursos>;

  @ViewChild(MatTable) tabla!:MatTable<Cursos>;

  constructor(
    private dialogRef:MatDialogRef<BuscarCursosComponent>,
    private cursosService:CursosService,
    @Inject(MAT_DIALOG_DATA) public data:Cursos
  ) {
    /*this.cursosSuscription = this.cursosService.getCursosObservable()
    .subscribe((cursos)=>{
      this.cursos = cursos;
      if(this.dataSource){
        this.renderTable();
      }
    });*/

    this.cursosSuscription = this.cursosService.cursosSubject.asObservable()
    .subscribe((cursos)=>{
      this.cursos = cursos;
      if(this.dataSource){
        this.renderTable();
      }
    });

    cursosService.cargarCursos();


   }

  cerrar(){
    this.dialogRef.close();
  }
  selectCurso(element:Cursos){
    this.selectedCurso = element;

  }

  agregar(){
    this.dialogRef.close(this.selectedCurso);
  }

  renderTable(){
    this.dataSource = new MatTableDataSource(this.cursos);
    this.tabla.renderRows();
  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Cursos>(this.cursos);
  }

}
