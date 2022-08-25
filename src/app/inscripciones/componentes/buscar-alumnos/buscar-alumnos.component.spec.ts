import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAlumnosComponent } from './buscar-alumnos.component';

describe('BuscarAlumnosComponent', () => {
  let component: BuscarAlumnosComponent;
  let fixture: ComponentFixture<BuscarAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarAlumnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
