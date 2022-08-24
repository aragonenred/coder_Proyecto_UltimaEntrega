import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesAltaComponent } from './inscripciones-alta.component';

describe('InscripcionesAltaComponent', () => {
  let component: InscripcionesAltaComponent;
  let fixture: ComponentFixture<InscripcionesAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscripcionesAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionesAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
