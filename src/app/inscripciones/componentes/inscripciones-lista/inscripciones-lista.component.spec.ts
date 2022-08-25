import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesListaComponent } from './inscripciones-lista.component';

describe('InscripcionesListaComponent', () => {
  let component: InscripcionesListaComponent;
  let fixture: ComponentFixture<InscripcionesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscripcionesListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
