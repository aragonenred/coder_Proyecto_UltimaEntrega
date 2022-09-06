import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaComponent } from './alta.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('AltaComponent', () => {
  let component: AltaComponent;
  let fixture: ComponentFixture<AltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [ AltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validacion del campo documento', ()=>{
  const formulario = component.formulario;
  const nombre = formulario.controls['nombre'];
  const apellido = formulario.controls['apellido'];
  const documento = formulario.controls['documento'];
  const email = formulario.controls['email'];
  const nacimiento = formulario.controls['nacimiento'];
  const pais = formulario.controls['pais'];

  nombre.setValue('Eduardo Emmanuel');
  apellido.setValue('Riccillo');
  email.setValue('eduardo@gmail.com');
  nacimiento.setValue('1999-01-01');
  pais.setValue('Argentina');

  documento.setValue('uuuiiiooll');
  expect(formulario.invalid).toBeTrue();

  documento.setValue('12345678912345879');
  expect(formulario.invalid).toBeTrue();

  documento.setValue('');
  expect(formulario.invalid).toBeTrue();


  });
  it('Validacion de campos obligatorios', ()=>{
    const formulario = component.formulario;
    const nombre = formulario.controls['nombre'].setValue('');
    const apellido = formulario.controls['apellido'].setValue('');
    const documento = formulario.controls['documento'].setValue('');
    const email = formulario.controls['email'].setValue('');
    const nacimiento = formulario.controls['nacimiento'].setValue('');
    const pais = formulario.controls['pais'].setValue('');


    expect(formulario.invalid).toBeTrue();

  });

});
