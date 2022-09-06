import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, map } from 'rxjs';

import { AlumnosService } from './alumnos.service';

describe('AlumnosService', () => {
  let httpClientSpy: {get: jasmine.Spy};
  let service: AlumnosService;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new AlumnosService(httpClientSpy as any);
    //service = TestBed.inject(AlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Validar obtencion de alumnos', (done: DoneFn)=>{
      const datosMock = [
        {nombre: "Maria Ana", apellido: "Fernandez", documento: "18653421", email: "ana.maria@gmail.com", nacimiento: "1988-01-23", pais: "Argentina", habilitado: true},
        {nombre: "Juan Alberto", apellido: "Paez", documento: "23615987", email: "juan@gmail.com", nacimiento: "2001-09-10", pais: "Uruguay", habilitado: true},
        {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "24895678", email: "mauro@gmail.com.ar", nacimiento: "1995-09-11", pais: "Chile", habilitado: true},
        {nombre: "Emmanuel Eduardo", apellido: "Riccillo", documento: "33692758", email: "ana.maria@gmail.com", nacimiento: "2003-01-09", pais: "Argentina", habilitado: true},
        {nombre: "Juan Alberto", apellido: "Paez", documento: "23615187", email: "juan@gmail.com", nacimiento: "1981-09-29", pais: "Bolivia", habilitado: true},
    //{nombre: "Ornela Florencia", apellido: "Marinelli", documento: "32615758", email: "mauro@gmail.com.ar", nacimiento: "1997-02-16", pais: "Paraguay", habilitado: false},
        {nombre: "Maria Ana", apellido: "Fernandez", documento: "18613411", email: "ana.maria@gmail.com", nacimiento: "1998-09-01", pais: "Brasil", habilitado: true},
        {nombre: "Juan Alberto", apellido: "Paez", documento: "23615480", email: "juan@gmail.com", nacimiento: "1998-09-01", pais: "Uruguay", habilitado: true},
        {nombre: "Mauro Fernando", apellido: "Alvarez", documento: "44495678", email: "mauro@gmail.com.ar", nacimiento: "1998-09-01", pais: "Paraguay", habilitado: true} ];


      httpClientSpy.get.and.returnValue(of(datosMock));

     /* service.getAlumnos().subscribe((alumnos)=>{
        expect(alumnos).toEqual(datosMock);
        done();
      });*/

      //Me suscribo al observable para obtener la lista de alumnos
     service.alumnosSubject.asObservable()
    .pipe(
      //Filtro los alumnos no habilitados
      map((alumnos: any[]) => alumnos.filter(alumno => alumno.habilitado === true))
    ).subscribe((alumnos)=>{
      expect(alumnos).toEqual(datosMock);
      done();
    });
    //Llamo a la funcion cargarAlumnos para que traiga desde la API y genere un next.
    service.cargarAlumnos();


  });


});
