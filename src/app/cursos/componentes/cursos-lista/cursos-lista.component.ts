import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Cursos } from '../../../models/cursos';
import { Subscription, map } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service';
import { CursosEditComponent } from '../cursos-edit/cursos-edit.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css']
})
export class CursosListaComponent implements OnInit {

  @Input() parentMesaje?:any;

  columnas:string[]=['id', 'titulo', 'duracion', 'profesor', 'acciones'];
  cursos:Cursos[] = [];
  cursosSuscription: Subscription;
  dataSource!: MatTableDataSource<Cursos>;

  @ViewChild(MatTable) tabla!:MatTable<Cursos>;

  constructor(private dialog: MatDialog, private cursosService:CursosService) {
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

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Cursos>(this.cursos);

  }

  agregarCurso(curso:Cursos){
    this.cursosService.addCurso(curso);
  }

  eliminarCurso(elemento:Cursos){
    if(elemento.id){
      this.cursosService.borrarCurso(elemento.id);
      this.renderTable();
    }else{
      console.log("Error, No se encontró id para borrar");
    }
  }

  editarCurso(elemento: Cursos){
    const dialogEdit = this.dialog.open(CursosEditComponent,{width:'500px', data: elemento});
    dialogEdit.afterClosed().subscribe(resultado => {
      if(resultado){
        this.cursosService.edutarCursos(resultado);
        this.tabla.renderRows();
      }
    })
  }


  /*Funcion anterior para modificar cursos
  editarCurso(elemento: Cursos){
    const dialogEdit = this.dialog.open(CursosEditComponent,{width:'500px', data: elemento});
    dialogEdit.afterClosed().subscribe(resultado => {
      if(resultado){
        const item = this.dataSource.data.find(curso => curso.id === resultado.id);
        const index = this.dataSource.data.indexOf(item!);
        this.dataSource.data[index] = resultado;
        this.tabla.renderRows();
      }
    })
  }*/

  renderTable(){
    this.dataSource = new MatTableDataSource(this.cursos);
    this.tabla.renderRows();
  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }



}
