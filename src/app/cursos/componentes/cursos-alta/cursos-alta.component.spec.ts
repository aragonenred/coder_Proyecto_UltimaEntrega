import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosAltaComponent } from './cursos-alta.component';

describe('CursosAltaComponent', () => {
  let component: CursosAltaComponent;
  let fixture: ComponentFixture<CursosAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
