import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCursosComponent } from './buscar-cursos.component';

describe('BuscarCursosComponent', () => {
  let component: BuscarCursosComponent;
  let fixture: ComponentFixture<BuscarCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
