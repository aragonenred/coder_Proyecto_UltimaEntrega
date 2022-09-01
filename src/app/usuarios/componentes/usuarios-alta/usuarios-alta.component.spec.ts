import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAltaComponent } from './usuarios-alta.component';

describe('UsuariosAltaComponent', () => {
  let component: UsuariosAltaComponent;
  let fixture: ComponentFixture<UsuariosAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
