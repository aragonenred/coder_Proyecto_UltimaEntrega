import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Cursos } from '../../../models/cursos';
import { Subscription, map, Observable } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service';
import { CursosEditComponent } from '../cursos-edit/cursos-edit.component';
import { Store } from '@ngrx/store';
import { CursoState } from '../../state/cursos.reducer';
import { cargarCursos, cursosCargados } from '../../state/cursos.actions';
import { selectCargandoState, selectCursosCargadosState } from '../../state/cursos.selectors';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css']
})
export class CursosListaComponent implements OnInit, OnDestroy {

  cargando$!: Observable<boolean>;
  cursos$!: Observable<Cursos[] | undefined>;

  cursos:Cursos[]|undefined

  @Input() parentMesaje?:any;

  columnas:string[]=['id', 'titulo', 'duracion', 'profesor', 'acciones'];
  //cursos:Cursos[] = [];
  cursosSuscription!: Subscription;
  dataSource!: MatTableDataSource<Cursos>;

  @ViewChild(MatTable) tabla!:MatTable<Cursos>;

  constructor(
    private dialog: MatDialog,
    private cursosService:CursosService,
    private store:Store<CursoState>,
    ) {
        }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Cursos>(this.cursos);

    /**Implemento el store (REDUX) */
    this.store.dispatch(cargarCursos());
    this.cargando$ = this.store.select(selectCargandoState);

    /**Al implementar effects ya no aplica esta funcion */
    /*this.cursosService.cursosSubject.asObservable().subscribe((cursos)=>{
      //Hago dispatch cada vez que se actualizan los datos en la API
      this.store.dispatch(cursosCargados({
        cursos: cursos
      }));

    });
    this.cursosService.cargarCursos();*/

    this.cursos$ = this.store.select(selectCursosCargadosState);

    /**Cargo la tabla */
    this.cursos$.subscribe((data)=>{
      this.cursos = data;
      this.renderTable();
    });

  }

  ngOnDestroy(): void {
    if(this.cursosSuscription){
      this.cursosSuscription.unsubscribe();
    }
  }

  agregarCurso(curso:Cursos){
   this.cursosService.postCursos(curso).subscribe(()=>{
    this.store.dispatch(cargarCursos());
    alert("Curso Agregado!");
   });

  }

  eliminarCurso(elemento:Cursos){
    if(elemento.id){
     this.cursosService.deteleCurso(elemento.id).subscribe(()=>{
      this.store.dispatch(cargarCursos());
      alert("Se eliminó el curso: #:" + elemento.id);
     });
    }else{
      alert("Error, No se encontró id para borrar");
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



  renderTable(){
    if(this.cursos){
      this.dataSource = new MatTableDataSource(this.cursos);
      if(this.tabla){
        this.tabla.renderRows();
      }
    }
  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }



}
